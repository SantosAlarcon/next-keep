import { useNewNoteStore } from "@/app/store/newNoteStore";
import type { Note } from "@/app/types";
import { createNewNote } from "@/app/utils/database/notes/createNewNote";
import { deleteNoteById } from "@/app/utils/database/notes/deleteNoteById";
import { getAllNotes } from "@/app/utils/database/notes/getAllNotes";
import { getAllPinnedNotes } from "@/app/utils/database/notes/getAllPinnedNotes";
import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import { updateNoteById } from "@/app/utils/database/notes/updateNoteById";
import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";

/**
 * @swagger
 * /api/notes:
 *  get:
 *      tags:
 *          - notes
 *      summary: Returns all the notes
 *      description: Returns all the notes from the database.
 *      responses:
 *        200:
 *          description: Returns all the notes
 *        400:
 *          description: Failed to connect to the database
 * /api/notes?id={id}:
 *  get:
 *      tags:
 *          - notes
 *      summary: Returns the note with that ID
 *      description: Returns the note with that ID from the database.
 *      parameters:
 *        - name: id
 *          in: query
 *          description: ID for the note to get
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *            description: Returns the note with that ID
 *          400:
 *            description: The ID provided doesn't exist in the DB
 * /api/notes?pinned={pinned}:
 *  get:
 *      tags:
 *          - notes
 *      summary: Returns all the pinned notes
 *      description: Returns all the pinned notes from the database.
 *      parameters:
 *        - name: pinned
 *          in: query
 *          description: Tells the API to retrieve only the pinned notes
 *          schema:
 *              type: boolean
 *      responses:
 *          200:
 *            description: Returns all the pinned notes
 *          400:
 *            description: Failed to connect to the database
 */
export async function GET(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	const pinned = searchParams.get("pinned")

	// If ID is provided in the search params, it returns the note with that ID
	if (id) {
		const foundNote = await getNoteById(id);

		if (!foundNote) {
			return Response.json({ message: "The ID provided doesn't exist in the DB" }, { status: 400 });
		}

		return Response.json(foundNote, { status: 200 });
	}

	if (pinned) {
		const pinnedNotes = await getAllPinnedNotes()
		return Response.json(pinnedNotes, {status: 200})
	}

	// If ID is not provided in the search params, it returns all the notes sorted by the updated date.
	const notes = await getAllNotes();
	// @ts-ignore
	notes.sort((a: Note, b: Note) => b.updatedDate.localeCompare(a.updatedDate));

	return Response.json(notes, { status: 200 });
}

/**
* @swagger
* /api/notes:
*  post:
*    tags:
*      - notes
*    summary: Creates a new note
*    description: Creates a new note on the database
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Note'
*    responses:
*      201:
*        description: Note is created successfully and inserted to the DB
*      400:
*        description: Body object must have a title and the data
*/
export async function POST(req: NextRequest) {
	const res = await req.json();

	// If there is no text and title in the request body, it shows an 400 error
	if (!(res.hasOwnProperty("title") && res.hasOwnProperty("data"))) {
		return Response.json({ message: "You need to provide the data and title in the request!" }, { status: 401 });
	}

	const newNote = useNewNoteStore.getState().newNote;
	const reset = useNewNoteStore.getState().reset;
	newNote.title = res.title;
	newNote.data = res.data;
	newNote.group = res.group;
	newNote.isPinned = res.isPinned;
	newNote.publishedDate = new Date().toISOString();
	newNote.updatedDate = new Date().toISOString();

	// Call the createNewNote function
	const creationSuccess = await createNewNote(newNote);

	if (!creationSuccess) {
		return Response.json({ message: "Failed to add new note to the DB" }, { status: 400 });
	}

	// Call the reset function of the store to create new note object
	reset();

	return Response.json({ message: `The note '${newNote.title}' has been added to the DB!` }, { status: 201 });
}

/**
* @swagger
* /api/notes:
*  put:
*    tags:
*      - notes
*    summary: Updates a existing note
*    description: Updates a note on the database with new title or data
*    parameters:
*      - name: id
*        in: query
*        description: ID of the note to update
*        schema:
*          type: string
*        required: true
*      - name: body
*        in: header
*        description: Body that contains the new title and/or data of the note
*        schema:
*          type: object
*        required: true
*  responses:
*    201:
*      description: Note is updated successfully on the DB
*    400:
*      description: ID and body object must have a title and the data, or ID doesn't exists in the DB.
*/
export async function PUT(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	// @ts-ignore
	const foundNote = await getNoteById(req.nextUrl.searchParams.get("id"));
	const body = await req.json();
	let pinStatusChanged: boolean = false;

	// If ID is not provided in the search params, it returns an error
	if (!id) {
		return Response.json({ message: "You need to provide the note ID" }, { status: 401 });
	}

	// It checks if the pin status has changed. It is useful to not update the updated date if the pin status hasn't changed.
	if (foundNote?.isPinned !== body.isPinned) {
		pinStatusChanged = true;
	}

	console.log("Pin status changed:", pinStatusChanged);

	const updatedNote = {
		...body,
		title: body.title,
		data: body.data,
		updatedDate: pinStatusChanged ? foundNote?.updatedDate : new Date().toISOString(),
		group: body.group,
		isPinned: body.isPinned,
	};

	// @ts-ignore
	const updateSuccess = await updateNoteById(id, updatedNote);

	if (!updateSuccess) {
		return Response.json({ message: "The note with that ID doesn't exist in the DB" }, { status: 400 });
	}

	return Response.json({ message: `The note with the ID ${id} has been updated in the DB` }, { status: 200 });
}

/**
* @swagger
* /api/notes:
*  delete:
*    tags:
*      - notes
*    summary: Deletes an existing note
*    description: Deletes an existing note on the database
*    parameters:
*      - name: id
*        in: query
*        description: ID of the note to delete
*        schema:
*          type: string
*        required: true
*    responses:
*      200:
*        description: Note is deleted successfully on the DB
*      400:
*        description: The ID provided doesn't exist in the DB or no ID provided in the query.
*/
export async function DELETE(req: NextRequest) {
	const searchParams: NextURL = req.nextUrl;
	const id = searchParams.searchParams.get("id");

	// If ID is not provided in the search params, it returns an error
	if (id === null) {
		return Response.json({ message: "You need to provide the note ID" }, { status: 401 });
	}

	// Call the deleteById function to delete the note
	const deleteSuccess = await deleteNoteById(id);

	if (!deleteSuccess) {
		return Response.json({ message: "The note with that ID doesn't exist in the DB" }, { status: 400 });
	}

	return Response.json({ message: `The note with the ID ${id} has been deleted from the DB` }, { status: 200 });
}

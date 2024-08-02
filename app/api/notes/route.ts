import type { Note } from "@/app/types";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import { createNewNote } from "@/app/utils/database/notes/createNewNote";
import { deleteNoteById } from "@/app/utils/database/notes/deleteNoteById";
import { getAllNotes } from "@/app/utils/database/notes/getAllNotes";
import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { updateNoteById } from "@/app/utils/database/notes/updateNoteById";

/**
 * @swagger
 * /api/notes:
 *  get:
 *      tags:
 *          - notes
 *      summary: Returns all the notes
 *      description: Returns all the notes from the database.
 *      parameters:
 *        - name: id
 *          in: query
 *          description: ID for the note to get
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Returns all the notes
*/
export async function GET(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id")

	// If ID is provided in the search params, it returns the note with that ID
	if (id) {
		const foundNote = await getNoteById(id)
		return Response.json(foundNote, { status: 200 })
	}

	// If ID is not provided in the search params, it returns all the notes sorted by the updated date.
	const notes = await getAllNotes()
	// @ts-ignore
	notes.sort((a: Note, b: Note) => b.updatedDate.localeCompare(a.updatedDate))

	return Response.json(notes, { status: 200 })
}

export async function POST(req: NextRequest) {
	const res = await req.json()

	// If there is no text and title in the request body, it shows an 400 error
	if (!(res.hasOwnProperty("title") && res.hasOwnProperty("data"))) {
		return Response.json({ message: "You need to provide the data and title in the request!" }, { status: 401 })
	}

	const newNote = useNewNoteStore.getState().newNote
	const reset = useNewNoteStore.getState().reset
	newNote.title = res.title
	newNote.data = res.data
	newNote.group = res.group
	newNote.isPinned = res.isPinned
	newNote.publishedDate = new Date().toISOString()
	newNote.updatedDate = new Date().toISOString()

	// Call the createNewNote function
	const creationSuccess = await createNewNote(newNote);

	if (!creationSuccess) {
		return Response.json({ message: "Failed to add new note to the DB" }, { status: 400 })
	}

	// Call the reset function of the store to create new note object
	reset()

	return Response.json({ message: `The note '${newNote.title}' has been added to the DB!` }, { status: 201 })
}

// @ts-ignore
export async function PUT(req: NextRequest) {
	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id")
	// @ts-ignore
	const foundNote = await getNoteById(req.nextUrl.searchParams.get("id"))
	const body = await req.json()
	let pinStatusChanged: boolean = false

	// If ID is not provided in the search params, it returns an error
	if (!id) {
		return Response.json({ message: "You need to provide the note ID" }, { status: 401 })
	}

	// It checks if the pin status has changed. It is useful to not update the updated date if the pin status hasn't changed.
	if (foundNote?.isPinned !== body.isPinned) {
		pinStatusChanged = true
	}

	console.log("Pin status changed:", pinStatusChanged)

	const updatedNote = {
		...body,
		title: body.title,
		data: body.data,
		updatedDate: pinStatusChanged ? foundNote?.updatedDate : new Date().toISOString(),
		group: body.group,
		isPinned: body.isPinned
	}

	// @ts-ignore
	const updateSuccess = await updateNoteById(id, updatedNote);

	if (!updateSuccess) {
		return Response.json({ message: "The note with that ID doesn't exist in the DB" }, { status: 400 })
	}

	return Response.json({ message: `The note with the ID ${id} has been updated in the DB` }, { status: 200 })

}

// @ts-ignore
export async function DELETE(req: NextRequest) {
	const searchParams: NextURL = req.nextUrl;
	const id = searchParams.searchParams.get("id")

	// If ID is not provided in the search params, it returns an error
	if (id === null) {
		return Response.json({ message: "You need to provide the note ID" }, { status: 401 })
	}

	// Call the deleteById function to delete the note
	const deleteSuccess = await deleteNoteById(id);

	if (!deleteSuccess) {
		return Response.json({ message: "The note with that ID doesn't exist in the DB" }, { status: 400 })
	}


	return Response.json({ message: `The note with the ID ${id} has been deleted from the DB` }, { status: 200 })
}

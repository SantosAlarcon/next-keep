import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { createNewNote } from "@/app/utils/database-appwrite/notes/createNewNote";
import { deleteNoteById } from "@/app/utils/database-appwrite/notes/deleteNoteById";
import { getAllPinnedNotes } from "@/app/utils/database-appwrite/notes/getAllPinnedNotes";
import { getNoteAmountsByGroups } from "@/app/utils/database-appwrite/notes/getNoteAmountByGroups";
import { getNoteById } from "@/app/utils/database-appwrite/notes/getNoteById";
import { getNotesByGroup } from "@/app/utils/database-appwrite/notes/getNotesByGroup";
import getNotesByUser from "@/app/utils/database-appwrite/notes/getNotesByUser";
import { updateNoteById } from "@/app/utils/database-appwrite/notes/updateNoteById";
import { getSession } from "@/app/utils/getSession";
import { checkRateLimit } from "@/app/utils/rateLimit";

const CreateNoteSchema = z.object({
	title: z.string().min(1).max(200),
	data: z.string().max(100_000),
	group: z.string().nullable().optional(),
	isPinned: z.boolean().optional(),
});

const UpdateNoteSchema = z.object({
	title: z.string().min(1).max(200).optional(),
	data: z.string().max(100_000).optional(),
	group: z.string().nullable().optional(),
	isPinned: z.boolean().optional(),
});

/**
 * @swagger
 * /api/notes_appwrite?userId={userId}:
 *  get:
 *      tags:
 *          - notes
 *      summary: Returns all the notes
 *      description: Returns all the notes of the user with that ID
 *      parameters:
 *        - name: userId
 *          in: query
 *          description: ID of the user
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns all the notes of the user with that ID
 * /api/notes_appwrite?amount:
 *  get:
 *      tags:
 *          - notes
 *      summary: Returns the amount of notes of every group
 *      description: Returns the amount of notes of every group from the database.
 *      parameters:
 *        - name: amount
 *          in: query
 *          description: Flag that tells the API to return the amount of notes of every group
 *          schema:
 *              type: boolean
 *      responses:
 *          200:
 *            description: Returns the amount of notes of every group
 *          400:
 *            description: Failed to connect to the database
 * /api/notes_appwrite?group={groupId}:
 *  get:
 *      tags:
 *          - notes
 *      summary: Returns the notes of the group with that ID
 *      description: Returns the notes of the group with that ID from the database.
 *      parameters:
 *        - name: groupId
 *          in: query
 *          description: ID for the note to get
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *            description: Returns the note list of the group with that ID
 *          400:
 *            description: The ID provided doesn't exist in the DB
 * /api/notes_appwrite?id={id}:
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
 * /api/notes_appwrite?pinned={pinned}:
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
	const rateLimitResult = checkRateLimit(req);
	if (rateLimitResult.limited) return rateLimitResult.response;

	const session = await getSession();
	if (!session) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	const pinned = searchParams.get("pinned");
	const group = searchParams.get("group");
	const amount = searchParams.get("amount");
	const userId = searchParams.get("userId");

	if (amount) {
		const noteAmounts = await getNoteAmountsByGroups();

		return Response.json(noteAmounts, { status: 200 });
	}

	// If ID is provided in the search params, it returns the note with that ID
	if (id) {
		const foundNote = await getNoteById(id);

		if (!foundNote) {
			return Response.json(
				{ message: "The ID provided doesn't exist in the DB" },
				{ status: 400 },
			);
		}

		return Response.json(foundNote, { status: 200 });
	}

	if (pinned) {
		const pinnedNotes = await getAllPinnedNotes();
		return Response.json(pinnedNotes, { status: 200 });
	}

	if (group) {
		const groupNoteList = await getNotesByGroup(group);

		if (!groupNoteList) {
			return Response.json(
				{ message: "The group with the ID provided doesn't exist in the DB" },
				{ status: 400 },
			);
		}

		return Response.json(groupNoteList, { status: 200 });
	}

	if (userId) {
		const notes = await getNotesByUser(userId);
		return Response.json(notes, { status: 200 });
	}
}

/**
 * @swagger
 * /api/notes_appwrite:
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
	const rateLimitResult = checkRateLimit(req);
	if (rateLimitResult.limited) return rateLimitResult.response;

	const session = await getSession();
	if (!session) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const res = await req.json();
	const parsed = CreateNoteSchema.safeParse(res);

	if (!parsed.success) {
		return Response.json(
			{ message: "Invalid input", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	const now = new Date().toISOString();
	const newNote = {
		title: parsed.data.title,
		data: parsed.data.data,
		group: parsed.data.group ?? null,
		isPinned: parsed.data.isPinned ?? false,
		$createdAt: now,
		$updatedAt: now,
		lastUpdated: now,
	};

	// Call the createNewNote function
	// @ts-ignore
	const creationSuccess = await createNewNote(newNote);

	if (!creationSuccess) {
		return Response.json(
			{ message: "Failed to add new note to the DB" },
			{ status: 400 },
		);
	}

	return Response.json(
		{ message: `The note '${newNote.title}' has been added to the DB!` },
		{ status: 201 },
	);
}

/**
 * @swagger
 * /api/notes_appwrite:
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
	const rateLimitResult = checkRateLimit(req);
	if (rateLimitResult.limited) return rateLimitResult.response;

	const session = await getSession();
	if (!session) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const searchParams: URLSearchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	// @ts-ignore
	const foundNote = await getNoteById(req.nextUrl.searchParams.get("id"));
	const body = await req.json();
	const parsed = UpdateNoteSchema.safeParse(body);

	if (!parsed.success) {
		return Response.json(
			{ message: "Invalid input", details: parsed.error.flatten() },
			{ status: 400 },
		);
	}

	let pinStatusChanged: boolean = false;

	if (!id) {
		return Response.json(
			{ message: "You need to provide the note ID" },
			{ status: 400 },
		);
	}

	if (foundNote?.isPinned !== parsed.data.isPinned) {
		pinStatusChanged = true;
	}

	const updatedNote = {
		title: parsed.data.title ?? foundNote?.title,
		data: parsed.data.data ?? foundNote?.data,
		lastUpdated: pinStatusChanged
			? foundNote?.updatedDate
			: new Date().toISOString(),
		group: parsed.data.group !== undefined ? parsed.data.group : foundNote?.group,
		isPinned: parsed.data.isPinned !== undefined ? parsed.data.isPinned : foundNote?.isPinned,
	};

	// @ts-ignore
	const updateSuccess = await updateNoteById(id, updatedNote);

	if (!updateSuccess) {
		return Response.json(
			{ message: "The note with that ID doesn't exist in the DB" },
			{ status: 400 },
		);
	}

	return Response.json(
		{ message: `The note with the ID ${id} has been updated in the DB` },
		{ status: 200 },
	);
}

/**
 * @swagger
 * /api/notes_appwrite:
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
	const rateLimitResult = checkRateLimit(req);
	if (rateLimitResult.limited) return rateLimitResult.response;

	const session = await getSession();
	if (!session) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const searchParams: NextURL = req.nextUrl;
	const id = searchParams.searchParams.get("id");

	// If ID is not provided in the search params, it returns an error
	if (id === null) {
		return Response.json(
			{ message: "You need to provide the note ID" },
			{ status: 401 },
		);
	}

	// Call the deleteById function to delete the note
	const deleteSuccess = await deleteNoteById(id);

	if (!deleteSuccess) {
		return Response.json(
			{ message: "The note with that ID doesn't exist in the DB" },
			{ status: 400 },
		);
	}

	return Response.json(
		{ message: `The note with the ID ${id} has been deleted from the DB` },
		{ status: 200 },
	);
}

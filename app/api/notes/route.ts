import { useNewNoteStore } from "@/app/store/newNoteStore";
import type { Note } from "@/app/types";
import { createNewNote } from "@/app/utils/database/notes/createNewNote";
import { deleteNoteById } from "@/app/utils/database/notes/deleteNoteById";
import { getAllNotes } from "@/app/utils/database/notes/getAllNotes";
import { getNoteById } from "@/app/utils/notes/getNoteById";
import { NextURL } from "next/dist/server/web/next-url";

export async function GET() {
    const notes = await getAllNotes()

    // @ts-ignore
    notes.sort((a: Note, b: Note) => b.updatedDate.localeCompare(a.updatedDate))

    return Response.json(notes, {status: 200})
}

export async function POST(req: Request) {
    const res = await req.json()

    // If there is no text and title in the request body, it shows an 400 error
    if (!(res.hasOwnProperty("title") && res.hasOwnProperty("data"))) {
        return Response.json({message: "You need to provide the data and title in the request!"}, {status: 401})
    }

    const newNote = useNewNoteStore.getState().newNote
    const reset = useNewNoteStore.getState().reset
    newNote.title = res.title
    newNote.data = res.data
    newNote.group = res.group

    // Call the createNewNote function
    const creationSuccess = await createNewNote(newNote);

    if (!creationSuccess) {
        return Response.json({message: "Failed to add new note to the DB"}, {status: 400})
    }

    // Call the reset function of the store to create new note object
    reset()

    return Response.json({message: `The note '${newNote.title}' has been added to the DB!`}, {status: 201})
}

// @ts-ignore
export async function PUT(req) {
    const searchParams: URLSearchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id")
    const body = await req.json()

    // If ID is not provided in the search params, it returns an error
    if (id === null) {
        return Response.json({message: "You need to provide the note ID"}, {status: 401})
    }

    const foundNote: Note = getNoteById(id);

    const updatedNote = {
        ...foundNote,
        title: body.title,
        data: body.data,
        updatedDate: new Date(),
        group: body.group,
        isPinned: body.isPinned
    }

    const notes = getAllNotes();
    const updatedNotes = notes.filter((note: Note) => note.id !== id)
    updatedNotes.push(updatedNote)

    return Response.json(updatedNotes, {status: 202})

}

// @ts-ignore
export async function DELETE(req) {
    const searchParams: NextURL = req.nextUrl;
    const id = searchParams.searchParams.get("id")

    // If ID is not provided in the search params, it returns an error
    if (id === null) {
        return Response.json({message: "You need to provide the note ID"}, {status: 401})
    }

    // Call the deleteById function to delete the note
    const deleteSuccess = await deleteNoteById(id);

    if (!deleteSuccess) {
        return Response.json({message: "The note with that ID doesn't exist in the DB"}, {status: 400})
    }


    return Response.json({message: `The note with the ID ${id} has been deleted from the DB`}, {status: 200})
}

import { useNewNoteStore } from "@/app/store/newNoteStore";
import { Note } from "@/app/types";
import { getAllNotes } from "@/app/utils/notes/getAllNotes";
import { getNoteById } from "@/app/utils/notes/getNoteById";
import { NextApiRequest } from "next";
import { NextURL } from "next/dist/server/web/next-url";

export async function GET() {
    const notes = getAllNotes();

    return Response.json(notes, {status: 200})
}

export async function POST(req: Request) {
    const res = await req.json()

    // If there is no text and title in the request body, it shows an 400 error
    if (!(res.hasOwnProperty("title") || res.hasOwnProperty("data"))) {
        return Response.json({message: "You need to provide the data and title in the request!"}, {status: 401})
    }

    const newNote = useNewNoteStore.getState().newNote
    const reset = useNewNoteStore.getState().reset
    newNote.title = res.title
    newNote.data = res.data
    newNote.group = res.group

    const notes = getAllNotes();
    const newArray = [...notes, newNote]

    reset()

    return Response.json(newArray, {status: 201})
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
    const id: URLSearchParams = req.nextUrl;

    // If ID is not provided in the search params, it returns an error
    if (id.get("id") === null) {
        return Response.json({message: "You need to provide the note ID"}, {status: 401})
    }

    const notes = getAllNotes();
    const newNotes = notes.filter((note: Note) => note.id !== id.get("id"))

    return Response.json(newNotes)
}

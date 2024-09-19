import { appwriteProjectId, notesEndpoint } from "@/app/constants";
import { getSession } from "../getSession"
import type { Note } from "@/app/types";

export const getAllNotes = async () => {
    const session = await getSession();
    const response = await fetch(notesEndpoint, {
        headers: {
            "X-Appwrite-Project": appwriteProjectId
        }
    })

    const allNotes = await response.json()
    return allNotes.documents.filter((note: Note) => note.userId === session.userId)
}

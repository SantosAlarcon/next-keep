import { appwriteAPIKey, appwriteProjectId, notesEndpoint } from "@/app/constants";
import type { Note } from "@/app/types";
import { ID } from "appwrite";
import { getSession } from "../getSession";

export const saveNewNote = async (newNote: Note) => {
	const session = await getSession();
    // @ts-ignore
	newNote.userId = session?.userId
	return await fetch(notesEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": appwriteProjectId,
			"X-Appwrite-Key": appwriteAPIKey
		},
		body: JSON.stringify({
			documentId: ID.unique(),
			data: newNote
		})
	})
};

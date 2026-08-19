"use server";

import { Note } from "@/app/types";
import { getAllNotes } from "./getAllNotes";
import {
	appwriteProjectId,
	notesEndpoint,
} from "@/app/constants";

export const changeLastUpdate = async () => {
	const noteList: Note[] = await getAllNotes();

	noteList.map((note) => {
		fetch(`${notesEndpoint}/${note.$id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": appwriteProjectId,
				"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
			},
			body: JSON.stringify({
				data: {
					lastUpdated: note.$updatedAt,
				},
			}),
		});
	});
};

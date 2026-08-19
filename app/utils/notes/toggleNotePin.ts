"use server";

import {
	appwriteProjectId,
	notesEndpoint,
} from "@/app/constants";
import type { Note } from "@/app/types";

export const toggleNotePin = async (note: Note) => {
	const newPinnedState = note.isPinned ? false : true;
	await fetch(`${notesEndpoint}/${note.$id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": appwriteProjectId,
			"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
		},
		body: JSON.stringify({
			data: {
				isPinned: newPinnedState,
			},
		}),
	});
};

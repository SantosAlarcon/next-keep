import type { Note } from "@/app/types";
import { appwriteAPIKey, appwriteProjectId, notesEndpoint } from "@/app/constants";

export const updateNote = async (updatedNote: Note) => {
	try {
		return await fetch(`${notesEndpoint}/${updatedNote.$id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": appwriteProjectId,
				"X-Appwrite-Key": appwriteAPIKey,
			},
			body: JSON.stringify({
				data: {
					data: updatedNote.data,
					title: updatedNote.title,
				},
			}),
		});
	} catch (error) {
		console.error(error);
	}
};

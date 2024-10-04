import { appwriteAPIKey, appwriteProjectId, notesEndpoint } from "@/app/constants";
import type { Note } from "@/app/types";
import { getNotesByGroup } from "./getNotesByGroup";

export const changeNoteGroupsToNull = async (groupId: string) => {
	const groupNotes = await getNotesByGroup(groupId);
	groupNotes.map(async (note: Note) => {
		await fetch(`${notesEndpoint}/${note.$id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": appwriteProjectId,
				"X-Appwrite-Key": appwriteAPIKey,
			},
			body: JSON.stringify({
				data: {
					group: null,
				}
			}),
		});
	})
};

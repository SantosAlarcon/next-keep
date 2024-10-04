import { appwriteAPIKey, appwriteProjectId, notesEndpoint } from "@/app/constants";
import type { Note } from "@/app/types";
import { getGroupByTitle } from "../groups/getGroupByTitle";

export const changeNoteGroup = async (note: Note, groupTitle: string) => {
	const group = await getGroupByTitle(groupTitle);
	await fetch(`${notesEndpoint}/${note.$id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": appwriteProjectId,
			"X-Appwrite-Key": appwriteAPIKey,
		},
		body: JSON.stringify({
			data: {
				group: group[0]?.$id,
			}
		}),
	});
};

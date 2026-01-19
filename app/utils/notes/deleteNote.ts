import { appwriteProjectId, notesEndpoint } from "@/app/constants";

export const deleteNote = async (noteId: string) => {
	if (noteId !== "") {
		return await fetch(`${notesEndpoint}/${noteId}`, {
			method: "DELETE",
			headers: {
				"X-Appwrite-Project": appwriteProjectId,
			},
		});
	}
};

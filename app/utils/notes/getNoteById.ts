import { appwriteProjectId, notesEndpoint } from "@/app/constants";

export const getNoteById = async (id: string) => {
	return await fetch(`${notesEndpoint}/${id}`, {
		headers: {
			"X-Appwrite-Project": appwriteProjectId,
		},
		cache: "no-cache"
	}).then((response) => response.json());
};

import { appwriteProjectId, notesEndpoint } from "@/app/constants";

export const getNoteById = async (id: string) => {
	return await fetch(`${notesEndpoint}/${id}`, {
		headers: {
			"X-Appwrite-Project": appwriteProjectId,
		},
		cache: "force-cache"
	}).then((response) => response.json());
};

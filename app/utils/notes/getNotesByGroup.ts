import {
	appwriteAPIKey,
	appwriteProjectId,
	notesEndpoint,
} from "@/app/constants";

export const getNotesByGroup = async (groupId: string) => {
	const response = await fetch(
		`${notesEndpoint}?queries[0]={"method":"equal","attribute":"group","values":["${groupId}"]}&queries[1]={"method":"orderDesc","attribute":"lastUpdated"}`,
		{
			headers: {
				"X-Appwrite-Project": appwriteProjectId,
				"X-Appwrite-Key": appwriteAPIKey,
			},
		},
	);

	const notes = await response.json();
	return notes.documents;
};

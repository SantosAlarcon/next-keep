import { appwriteProjectId, notesEndpoint } from "@/app/constants";
import { getSession } from "../getSession"

export const getAllNotes = async () => {
	const session = await getSession();
	const response = await fetch(`${notesEndpoint}?queries[0]={"method":"equal","attribute":"userId","values":["${session?.userId}"]}&queries[1]={"method":"orderDesc", "attribute":"lastUpdated"}`, {
		headers: {
			"X-Appwrite-Project": appwriteProjectId
		},
		cache: "no-cache"
	})

	const allNotes = await response.json()
	return allNotes.documents
}

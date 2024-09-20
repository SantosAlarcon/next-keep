import { appwriteAPIKey, appwriteProjectId, groupsEndpoint } from "@/app/constants"

export const updateGroupById = async (id: string, newTitle: string) => {
	return await fetch(`${groupsEndpoint}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": appwriteProjectId,
			"X-Appwrite-Key": appwriteAPIKey
		},
		body: JSON.stringify({ data: { title: newTitle } }),
	})
}

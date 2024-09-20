import { appwriteAPIKey, appwriteProjectId, groupsEndpoint } from "@/app/constants"

export const deleteGroupById = async (id: string) => {
	return await fetch(`${groupsEndpoint}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": appwriteProjectId,
			"X-Appwrite-Key": appwriteAPIKey
		},

	})
}

import {
	appwriteAPIKey,
	appwriteProjectId,
	groupsEndpoint,
} from "@/app/constants";

export const deleteGroupById = async (groupId: string) => {
	return await fetch(`${groupsEndpoint}/${groupId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": appwriteProjectId,
			"X-Appwrite-Key": appwriteAPIKey,
		},
	});
};

import { appwriteAPIKey, appwriteProjectId, groupsEndpoint } from "@/app/constants";
import { getSession } from "../getSession";
import { ID } from "appwrite";

export const createNewGroup = async (newGroup: string) => {
	const session = await getSession();
	return await fetch(groupsEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": appwriteProjectId,
			"X-Appwrite-Key": appwriteAPIKey,
		},
		body: JSON.stringify({
			documentId: ID.unique(),
			data: {
				title: newGroup,
				userId: session.userId,
			},
		}),
	});
};

import { appwriteProjectId, groupsEndpoint } from "@/app/constants";
import { getSession } from "../getSession";

export const getAllGroups = async () => {
	const session = await getSession();
	const response = await fetch(
		`${groupsEndpoint}?queries[0]={"method":"equal","attribute":"userId","values":["${session?.userId}"]}&queries[1]={"method":"orderAsc", "attribute":"title"}`,
		{
			headers: {
				"X-Appwrite-Project": appwriteProjectId,
			},
		},
	);

	const allGroups = await response.json();
	return allGroups.documents;
};

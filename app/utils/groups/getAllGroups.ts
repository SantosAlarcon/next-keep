import { getSession } from "../getSession";

export const getAllGroups = async () => {
	const session = await getSession();
	const response = await (
		await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!}/documents?queries[0]={"method":"equal","attribute":"userId","values":["${session?.userId}"]}&queries[1]={"method":"orderAsc", "attribute":"title"}`,
			{
				headers: {
					"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
				},
			},
		)
	).json();

	return response.documents;
};

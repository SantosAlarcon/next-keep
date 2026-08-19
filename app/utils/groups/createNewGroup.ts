"use server";

import { ID } from "appwrite";
import { getSession } from "../getSession";

export const createNewGroup = async (newGroupTitle: string) => {
	const session = await getSession();

	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!}/documents`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
				"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
			},
			body: JSON.stringify({
				documentId: ID.unique(),
				data: {
					title: newGroupTitle,
					userId: session?.userId,
				},
			}),
		},
	);
};

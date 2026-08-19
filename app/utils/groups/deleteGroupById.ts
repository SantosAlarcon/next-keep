"use server";

export const deleteGroupById = async (groupId: string) => {
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!}/documents/${groupId}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
				"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
			},
		},
	);
};

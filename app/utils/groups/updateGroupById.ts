"use server";

export const updateGroupById = async (id: string, newTitle: string) => {
	return await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!}/documents/${id}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
				"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
			},
			body: JSON.stringify({ data: { title: newTitle } }),
		},
	);
};

"use server";

export const getNotesByGroup = async (groupId: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!}/documents?queries[0]={"method":"equal","attribute":"group","values":["${groupId}"]}&queries[1]={"method":"orderDesc","attribute":"lastUpdated"}`,
		{
			headers: {
				"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
				"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
			},
		},
	);

	const notes = await response.json();
	return notes.documents;
};

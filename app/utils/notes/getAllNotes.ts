import { getSession } from "../getSession";

export const getAllNotes = async () => {
	const session = await getSession();
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!}/documents?queries[0]={"method":"equal","attribute":"userId","values":["${session?.userId}"]}&queries[1]={"method":"orderDesc", "attribute":"lastUpdated"}`,
		{
			headers: {
				"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
			},
			cache: "no-cache",
		},
	);

	const allNotes = await response.json();
	return allNotes.documents;
};

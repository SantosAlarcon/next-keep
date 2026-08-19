"use server";

import type { Note } from "@/app/types";

export const updateNote = async (updatedNote: Note) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!}/documents/${updatedNote.$id}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
				"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
			},
			body: JSON.stringify({
				data: {
					data: updatedNote.data,
					title: updatedNote.title,
					lastUpdated: new Date().toISOString(),
				},
			}),
		},
	);

	if (!response.ok) {
		throw new Error(`Update failed: ${response.status}`);
	}

	const result = await response.json();
	return result;
};

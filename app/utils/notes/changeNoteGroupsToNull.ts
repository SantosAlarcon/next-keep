"use server";

import type { Note } from "@/app/types";
import { getNotesByGroup } from "./getNotesByGroup";

export const changeNoteGroupsToNull = async (groupId: string) => {
	const groupNotes = await getNotesByGroup(groupId);
	groupNotes.map(async (note: Note) => {
		await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!}/documents/${note.$id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
					"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
				},
				body: JSON.stringify({
					data: {
						group: null,
					},
				}),
			},
		);
	});
};

import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import type { Note } from "@/app/types";
import { databaseID, notesCollectionID } from "@/app/constants";
import { ID } from "appwrite";

export const createNewNote = async (note: Note) => {
	const session = getSession();

	try {
		await appwriteDatabase.createDocument(databaseID, notesCollectionID, ID.unique(), {
			title: note.title,
			data: note.data,
			group: note.group,
			isPinned: note.isPinned,
			publishedDate: note.$createdAt,
			updatedDate: note.$updatedAt,
			// @ts-ignore
			userId: session.userI!
		})
		return true;
	} catch (error) {
		console.error(error)
		return false;
	}
}

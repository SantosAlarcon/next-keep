import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export const getNoteById = async (noteId: string) => {

	try {
		const note = await appwriteDatabase.getDocument(databaseID, notesCollectionID, noteId)
		return note;
	} catch (error) {
		console.error(error)
	}
}

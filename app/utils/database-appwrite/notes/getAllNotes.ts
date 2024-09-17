import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import { databaseID, notesCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getAllNotes = async () => {
	const session = getSession();
	try {
		const notes = await appwriteDatabase.listDocuments(databaseID, notesCollectionID, [
			Query.equal("userId", session.userId),
		])
		return notes.documents;
	} catch (error) {
		console.error(error)
	}
}

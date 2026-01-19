import { Query } from "appwrite";
import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export const getNotesByGroup = async (groupId: string) => {
	try {
		const notes = await appwriteDatabase.listDocuments(
			databaseID,
			notesCollectionID,
			[Query.equal("group", groupId), Query.orderDesc("$updatedAt")],
		);

		return notes.documents;
	} catch (error) {
		console.error(error);
	}
};

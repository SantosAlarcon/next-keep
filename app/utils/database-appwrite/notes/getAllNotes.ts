import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import { databaseID, notesCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getAllNotes = async () => {
	const session = await getSession();
	try {
		const notes = await appwriteDatabase.listDocuments(
			databaseID,
			notesCollectionID,
			[
				// @ts-ignore
				Query.equal("userId", session.userId),
			],
		);
		console.log(notes.documents);
		return notes.documents;
	} catch (error) {
		console.error(error);
	}
};

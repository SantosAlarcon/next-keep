import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import { databaseID, notesCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getAllPinnedNotes = async () => {
	const session = await getSession();
	try {
		const pinnedNotes = await appwriteDatabase.listDocuments(databaseID, notesCollectionID, [
			Query.equal("isPinned", true),
			Query.orderDesc("$updatedAt"),
            // @ts-ignore
			Query.equal("userId", session?.userId),
		]);

		return pinnedNotes.documents;
	} catch (error) {
		console.error(error);
	}
};

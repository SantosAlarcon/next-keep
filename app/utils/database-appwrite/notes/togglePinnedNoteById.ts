import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export const togglePinnedByNote = async (id: string, pinnedValue: boolean) => {
	try {
		await appwriteDatabase.updateDocument(databaseID, notesCollectionID, id, {
			isPinned: pinnedValue
		})
		return true;
	} catch (error) {
		// @ts-ignore
		console.error(error.message)
		return false;
	}
}

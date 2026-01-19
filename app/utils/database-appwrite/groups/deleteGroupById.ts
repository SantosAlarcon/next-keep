import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";

export const deleteGroupById = async (id: string) => {
	try {
		await appwriteDatabase.deleteRow({
            databaseId: databaseID,
            tableId: groupsCollectionID,
            rowId: id
        })
		return true;
	} catch (error) {
		// @ts-ignore
		console.error(error.meta.cause);

		return false;
	}
};

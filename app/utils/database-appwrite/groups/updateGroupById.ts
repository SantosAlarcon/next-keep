import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";

export const updateGroupById = async (id: string, title: string) => {
	try {
		await appwriteDatabase.updateRow({
            databaseId: databaseID,
            tableId: groupsCollectionID,
            rowId: id,
            data: {
                title: title,
            }
        })
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

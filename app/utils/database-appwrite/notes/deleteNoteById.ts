import { databaseID, notesCollectionID } from "@/app/constants";
import { appwriteDatabase } from "@/app/appwrite";

export const deleteNoteById = async (id: string) => {
    try {
        await appwriteDatabase.deleteRow({
            databaseId: databaseID,
            tableId: notesCollectionID,
            rowId: id,
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

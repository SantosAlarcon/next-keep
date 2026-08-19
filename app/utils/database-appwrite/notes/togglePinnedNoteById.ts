import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export const togglePinnedByNote = async (id: string, pinnedValue: boolean) => {
    try {
        await appwriteDatabase.updateRow({
            databaseId: databaseID,
            tableId: notesCollectionID,
            rowId: id,
            data: {
                isPinned: pinnedValue,
            },
        });

        return true;
    } catch {
        return false;
    }
};

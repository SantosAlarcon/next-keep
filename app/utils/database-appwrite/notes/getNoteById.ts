import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export const getNoteById = async (noteId: string) => {
    if (!noteId) return null;
    try {
        const note = await appwriteDatabase.getRow({
            databaseId: databaseID,
            tableId: notesCollectionID,
            rowId: noteId,
        });
        return note;
    } catch (error) {
        console.error(error);
    }
};

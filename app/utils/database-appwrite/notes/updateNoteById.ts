import { Note } from "@/app/types";
import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export const updateNoteById = async (id: string, updatedNote: Note) => {
    try {
        await appwriteDatabase.updateRow({
            databaseId: databaseID,
            tableId: notesCollectionID,
            rowId: id,
            data: {
                title: updatedNote.title,
                data: updatedNote.data,
                isPinned: updatedNote.isPinned,
                group: updatedNote.group,
            },
        });

        return true;
    } catch (error) {
        // @ts-ignore
        console.error("ERROR:", error?.meta?.cause);
        return false;
    }
};

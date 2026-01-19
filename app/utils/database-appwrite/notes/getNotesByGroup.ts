import { Query } from "appwrite";
import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export const getNotesByGroup = async (groupId: string) => {
    try {
        const notes = await appwriteDatabase.listRows({
            databaseId: databaseID,
            tableId: notesCollectionID,
            queries: [Query.equal("group", groupId), Query.orderDesc("$updatedAt")],
        });

        return notes.rows;
    } catch (error) {
        console.error(error);
    }
};

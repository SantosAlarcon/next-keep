import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import { databaseID, notesCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getAllNotes = async () => {
    const session = await getSession();
    try {
        const notes = await appwriteDatabase.listRows({
            databaseId: databaseID,
            tableId: notesCollectionID,
            queries: [
                // @ts-ignore
                Query.equal("userId", session.userId),
            ],
        });
        return notes.rows;
    } catch (error) {
        console.error(error);
    }
};

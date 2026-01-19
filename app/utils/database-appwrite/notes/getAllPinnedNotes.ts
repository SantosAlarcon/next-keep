import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import { databaseID, notesCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getAllPinnedNotes = async () => {
    const session = await getSession();
    try {
        const pinnedNotes = await appwriteDatabase.listRows({
            databaseId: databaseID,
            tableId: notesCollectionID,
            queries: [
                Query.equal("isPinned", true),
                Query.orderDesc("$updatedAt"),
                // @ts-ignore
                Query.equal("userId", session?.userId),
            ],
        });

        return pinnedNotes.rows;
    } catch (error) {
        console.error(error);
    }
};

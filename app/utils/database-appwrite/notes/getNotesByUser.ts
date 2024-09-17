import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";
import { Query } from "appwrite";

const getNotesByUser = async (userId: string) => {
    const notes = await appwriteDatabase.listDocuments(databaseID, notesCollectionID, [
        Query.equal("userId", userId),
        Query.orderDesc("$updatedAt"),
        Query.select(["$id", "title", "isPinned", "data", "group", "userId", "$createdAt", "$updatedAt"])
    ])

    return notes.documents;
}

export default getNotesByUser;

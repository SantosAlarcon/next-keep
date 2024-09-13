import { appwriteDatabase } from "@/app/appwrite";
import { Query } from "appwrite";

const getNotesByUser = async (userId: string) => {
    const notes = await appwriteDatabase.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!, [
        Query.equal("userId", userId),
        Query.orderDesc("$updatedAt"),
        Query.select(["title", "isPinned", "data", "group", "userId", "$createdAt", "$updatedAt"])
    ])

    return notes.documents;
}

export default getNotesByUser;

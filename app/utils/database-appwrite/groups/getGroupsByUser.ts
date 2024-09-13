import { appwriteDatabase } from "@/app/appwrite";
import { Query } from "appwrite";

const getGroupsByUser = async (userId: string) => {
    const groups = await appwriteDatabase.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!, [
        Query.equal("userId", userId),
        Query.orderAsc("title"),
        Query.select([ "$id", "title", "userId" ])
    ])

    return groups.documents;
}

export default getGroupsByUser;

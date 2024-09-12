import { appwriteDatabase } from "@/app/appwrite"
import { Query } from "appwrite"

export const getGroupByTitle = async (title: string) => {
	const group = await appwriteDatabase.listDocuments(process.env.DATABASE_ID!, process.env.GROUPS_COLLECTION_ID!, [Query.equal("title", title)])

	return group.documents[0]
}

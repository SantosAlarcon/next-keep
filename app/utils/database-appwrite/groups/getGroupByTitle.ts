import { appwriteDatabase } from "@/app/appwrite"
import { databaseID, groupsCollectionID } from "@/app/constants"
import { Query } from "appwrite"

export const getGroupByTitle = async (title: string) => {
	const group = await appwriteDatabase.listDocuments(databaseID, groupsCollectionID, [Query.equal("title", title)])

	return group.documents[0]
}

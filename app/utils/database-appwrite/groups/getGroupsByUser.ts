import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getGroupsByUser = async (userId: string) => {
	const groups = await appwriteDatabase.listDocuments(databaseID, groupsCollectionID, [
		Query.equal("userId", userId),
		Query.orderAsc("title"),
		Query.select(["$id", "title", "userId"])
	])

	return groups.documents;
}

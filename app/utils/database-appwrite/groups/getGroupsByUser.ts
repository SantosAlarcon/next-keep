import { Query } from "appwrite";
import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";

export const getGroupsByUser = async (userId: string) => {
	const groups = await appwriteDatabase.listRows({
		databaseId: databaseID,
		tableId: groupsCollectionID,
		queries: [
			Query.equal("userId", userId),
			Query.orderAsc("title"),
			Query.select(["$id", "title", "userId"]),
		],
	});

	return groups.rows;
};

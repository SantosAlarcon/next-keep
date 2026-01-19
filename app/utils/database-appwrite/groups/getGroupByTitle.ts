import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getGroupByTitle = async (title: string) => {
	const group = await appwriteDatabase.listRows({
		databaseId: databaseID,
		tableId: groupsCollectionID,
		queries: [Query.equal("title", title)],
	});

	return group.rows[0];
};

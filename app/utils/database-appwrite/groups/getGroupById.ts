import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getGroupById = async (id: string) => {
	try {
		const group = await appwriteDatabase.listRows({
			databaseId: databaseID,
			tableId: groupsCollectionID,
			queries: [Query.equal("$id", id)],
		});
		return group.rows[0];
	} catch (error) {
		console.error(error);
	}
};

import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getAllGroups = async () => {
	try {
		const query = await appwriteDatabase.listDocuments(databaseID!, groupsCollectionID, [Query.orderAsc("title")]);
		return query.documents;
	} catch (error) {
		console.error(error);
	}
};

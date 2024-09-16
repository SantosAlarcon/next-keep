import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getGroupById = async (id: string) => {
	try {
		const group = await appwriteDatabase.listDocuments(databaseID, groupsCollectionID, [Query.equal("$id", id)]);
		return group.documents[0];
	} catch (error) {
		console.error(error);
	}
};

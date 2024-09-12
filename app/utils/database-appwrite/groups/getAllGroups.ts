import { appwriteDatabase } from "@/app/appwrite";
import { Query } from "appwrite";

export const getAllGroups = async () => {

	try {
		const query = await appwriteDatabase.listDocuments(process.env.DATABASE_ID!, process.env.GROUPS_COLLECTION_ID!, [Query.orderAsc("title")])
		return query.documents
	} catch (error) {
		console.error(error);
	}

}

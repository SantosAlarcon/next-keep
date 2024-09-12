import { appwriteDatabase } from "@/app/appwrite";
import { Query } from "appwrite";

export const getGroupById = async (id: string) => {
	try {
		const group = await appwriteDatabase.listDocuments(process.env.DATABASE_ID!, process.env.GROUPS_COLLECTION_ID!, [Query.equal("$id", id)]);
		return group.documents[0];
	} catch (error) {
		console.error(error);
	}
};

import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import { databaseID, groupsCollectionID } from "@/app/constants";
import { Query } from "appwrite";

export const getAllGroups = async () => {
	const session = await getSession()

	try {
		const query = appwriteDatabase.listDocuments(
			databaseID, groupsCollectionID, [Query.equal("userId", session.userId), Query.orderAsc("title")],
		)
		return query
	} catch (error) {
		console.error(error);
	}

}

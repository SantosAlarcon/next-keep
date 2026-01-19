import { ID, Permission, Role } from "appwrite";
import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, groupsCollectionID } from "@/app/constants";
import { getSession } from "../../getSession";

export const createNewGroup = async (title: string) => {
	const session = await getSession();
	return await appwriteDatabase.createRow({
		databaseId: databaseID,
		tableId: groupsCollectionID,
		rowId: ID.unique(),
		data: {
			title,
			userId: session.userId,
		},
		permissions: [
			Permission.read(Role.user(session.userId)),
			Permission.write(Role.user(session.userId)),
			Permission.delete(Role.user(session.userId)),
			Permission.update(Role.user(session.userId)),
		],
	});
};

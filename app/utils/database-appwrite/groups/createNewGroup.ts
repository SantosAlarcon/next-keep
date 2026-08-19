import { ID, Permission, Role } from "appwrite";
import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";

export const createNewGroup = async (title: string) => {
	const session = await getSession();
	return await appwriteDatabase.createRow({
		databaseId: process.env.NEXT_PUBLIC_DATABASE_ID!,
		tableId: process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!,
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

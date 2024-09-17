import { appwriteDatabase } from "@/app/appwrite"
import { databaseID, groupsCollectionID } from "@/app/constants"
import { ID, Permission, Role } from "appwrite"
import { getSession } from "../../getSession"

export const createNewGroup = async (title: string) => {
	// @ts-ignore
	const session = getSession();
	await appwriteDatabase.createDocument(databaseID, groupsCollectionID, ID.unique(), {
		title: title,
		userId: session.userId,
	}, [Permission.read(Role.user(session.userId)), Permission.write(Role.user(session.userId)), Permission.delete(Role.user(session.userId)), Permission.update(Role.user(session.userId))])
}

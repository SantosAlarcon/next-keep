import { appwriteAccount, appwriteDatabase } from "@/app/appwrite"
import { ID, Models, Permission, Role } from "appwrite"

export const createNewGroup = async (title: string) => {
	//const session: Models.User<Models.Preferences> = await appwriteAccount.get()
    appwriteAccount.get().then((response) => console.log(response))
	//console.log(session)
	//await appwriteDatabase.createDocument(process.env.DATABASE_ID!, process.env.GROUPS_COLLECTION_ID!, ID.unique(), { title: title, userId: session.$id }, [Permission.read(Role.user(session.$id)), Permission.update(Role.user(session.$id)), Permission.delete(Role.user(session.$id))])
}

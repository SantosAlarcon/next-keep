import { Client, Account, Databases, Avatars } from "appwrite";
import { Client as SVClient, Account as SVAccount, Databases as SVDatabases, Avatars as SVAvatars } from "node-appwrite";

export const appwriteClient = new Client()
    .setLocale("es")
    .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const appwriteAccount = new Account(appwriteClient);

export const appwriteDatabase = new Databases(appwriteClient);

export const appwriteServerClient = new SVClient()
    .setLocale("es")
    .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!)

export const appwriteServerAccount = new SVAccount(appwriteServerClient);

export const appwritesServerDatabase = new SVDatabases(appwriteServerClient);


// @ts-ignore
// const {setSession, setUser} = authStore.getState();
// appwriteAccount.get().then((account) => setUser(account)).catch((error) => console.log(error))
// appwriteAccount.getSession("current").then((session) => setSession(session)).catch((error) => console.log(error))

export const getInitials = () => {
	const result = new Avatars(appwriteClient).getInitials();
	return result;
};

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

	return {
		get account() {
			return new Account(client);
		},
	};
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch (error) {
		return null;
	}
}

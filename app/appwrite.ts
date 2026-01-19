import { Client, Account } from "appwrite";
import {
	Client as SVClient,
	Account as SVAccount,
	Avatars as SVAvatars,
	TablesDB,
} from "node-appwrite";
import { apiEndpoint, appwriteAPIKey, appwriteProjectId } from "./constants";

export const appwriteClient = new SVClient()
	.setLocale("es")
	.setEndpoint(apiEndpoint)
	.setProject(appwriteProjectId)
	.setKey(appwriteAPIKey);

export const appwriteAccount = new SVAccount(appwriteClient);

export const appwriteDatabase = new TablesDB(appwriteClient);

// export const appwriteServerClient = new SVClient()
//     .setLocale("es")
//     .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!)
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
//     .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!)
//
// export const appwriteServerAccount = new SVAccount(appwriteServerClient);
//
// export const appwritesServerDatabase = new SVDatabases(appwriteServerClient);

// @ts-ignore
// const {setSession, setUser} = authStore.getState();
// appwriteAccount.get().then((account) => setUser(account)).catch((error) => console.log(error))
// appwriteAccount.getSession("current").then((session) => setSession(session)).catch((error) => console.log(error))

export const getInitials = () => {
	const result = new SVAvatars(appwriteClient).getInitials();
	return result;
};

export const getAccount = () => {
	return appwriteAccount;
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

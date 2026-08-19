import { Account, Avatars, Client, TablesDB } from "appwrite";

export const appwriteClient = new Client()
	.setLocale("es")
	.setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const appwriteAccount = new Account(appwriteClient);

export const appwriteDatabase = new TablesDB(appwriteClient);

export const getInitials = () => {
	const result = new Avatars(appwriteClient).getInitials();
	return result;
};

export const getAccount = () => {
	return appwriteAccount;
};

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!)
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

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

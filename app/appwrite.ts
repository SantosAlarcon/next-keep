import { Client, Account, Databases, Avatars } from "appwrite";
import { authStore } from "./store/authStore";

export const appwriteClient = new Client();

appwriteClient
    .setLocale("es")
    .setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!)
    .setSession("current")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

//export const createAppwriteClient = () =>
//	new Client()
//		.setLocale("es")
//		.setEndpoint(process.env.API_ENDPOINT!)
//		.setProject(process.env.APPWRITE_PROJECT_ID!);
//
//export const appwriteClientAccount = new Account(createAppwriteClient());
export const appwriteAccount = new Account(appwriteClient);

export const appwriteDatabase = new Databases(appwriteClient);

// @ts-ignore
const {setSession, setUser} = authStore.getState();
appwriteAccount.get().then((account) => setUser(account)).catch((error) => console.log(error))
appwriteAccount.getSession("current").then((session) => setSession(session)).catch((error) => console.log(error))

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

// Register User
/*appwriteAccount.create(ID.unique(), "santosalarcon86@gmail.com", "Pepe12345", "Santos Alarcón Asensio")
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });*/

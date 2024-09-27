import { appwriteAccount } from "../appwrite";

export async function emailLogin(data: FormData) {
	const email = data.get("email")?.toString();
	const password = data.get("password")?.toString();

	if (email && password) {
		return await appwriteAccount.createEmailPasswordSession(email, password)
	}
}

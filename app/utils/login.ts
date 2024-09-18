import { OAuthProvider } from "appwrite";
import { appwriteAccount } from "../appwrite";

export async function emailLogin(data: FormData) {
	const email = data.get("email")?.toString();
	const password = data.get("password")?.toString();

	if (email && password) {
		return await appwriteAccount
			.createEmailPasswordSession(email, password)
	}
}

export async function loginToFacebook() {
	appwriteAccount.createOAuth2Session(OAuthProvider.Facebook, "http://localhost:3000/notes/all");
}

export async function loginToGoogle() {
	appwriteAccount.createOAuth2Session(OAuthProvider.Google, "http://localhost:3000/notes/all");
}

export async function loginToGithub() {
	appwriteAccount.createOAuth2Session(OAuthProvider.Github, "http://localhost:3000/notes/all");
}

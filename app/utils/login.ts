import { OAuthProvider } from "appwrite";
import { appwriteAccount } from "../appwrite";
import { redirect } from "next/navigation";

export async function emailLogin(data: FormData) {
	const email = data.get("email")?.toString();
	const password = data.get("password")?.toString();

	if (email && password) {
		return await appwriteAccount.createEmailPasswordSession(email, password)
	}
}

export async function loginToFacebook() {
	await appwriteAccount.createOAuth2Token(OAuthProvider.Facebook, `${process.env.NEXT_URL}/notes/all`);
}

/*export async function loginToGoogle() {
	const redirectUrl = await appwriteAccount.createOAuth2Token(OAuthProvider.Google, `${process.env.NEXT_URL}/api/oauth`);

	return redirect(redirectUrl);
}*/

export async function loginToGithub() {
	await appwriteAccount.createOAuth2Token(OAuthProvider.Github, `${process.env.NEXT_PUBLIC_URL}/notes/all`);
}

"use server";

import { OAuthProvider } from "appwrite";
import { appwriteAccount } from "../appwrite";
import { cookies } from "next/headers";

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
    // @ts-ignore
	appwriteAccount.createOAuth2Session(OAuthProvider.Google, "http://localhost:3000/notes/all").then((response) => {
		cookies().set("appwrite_session", JSON.stringify(response));
	});
}

export async function loginToGithub() {
	appwriteAccount.createOAuth2Session(OAuthProvider.Github, "http://localhost:3000/notes/all");
}

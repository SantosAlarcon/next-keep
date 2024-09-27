"use server"

import { redirect } from "next/navigation";
import { OAuthProvider } from "appwrite";
import { getAccount } from "../appwrite";

export async function loginToGoogle() {
	const account = getAccount();
	const redirectUrl = await account.createOAuth2Token(OAuthProvider.Google, `${process.env.NEXT_PUBLIC_URL}/api/oauth`);

	return redirect(redirectUrl);
}

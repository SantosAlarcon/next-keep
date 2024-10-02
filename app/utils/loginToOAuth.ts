"use server"

import { redirect } from "next/navigation";
import type { OAuthProvider } from "appwrite";
import { getAccount } from "../appwrite";

export async function loginToOAuth(provider: OAuthProvider) {
	const account = getAccount();
	const redirectUrl = await account.createOAuth2Token(provider, `${process.env.NEXT_PUBLIC_URL}/api/oauth`, `${process.env.NEXT_PUBLIC_URL}/login/es`);

	return redirect(redirectUrl);
}

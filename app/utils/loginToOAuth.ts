"use server";

import { redirect } from "next/navigation";
import type { OAuthProvider } from "appwrite";
import { getAccount } from "../appwrite";
import { mainURL } from "../constants";

export async function loginToOAuth(provider: OAuthProvider) {
	const account = getAccount();
	const redirectUrl = await account.createOAuth2Token(
		provider,
		`${mainURL}/api/oauth`,
		`${mainURL}/login/es`,
	);

	return redirect(redirectUrl);
}

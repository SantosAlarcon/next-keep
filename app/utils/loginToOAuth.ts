"use server";

import type { Account, OAuthProvider } from "appwrite";
import { redirect } from "next/navigation";
import { getAccount } from "../appwrite";
import { mainURL } from "../constants";

export async function loginToOAuth(provider: OAuthProvider) {
	const account: Account = getAccount();
	const redirectUrl = account.createOAuth2Token({
		provider: provider,
		success: `${mainURL}/api/oauth`,
		failure: `${mainURL}/login`,
	});

	return redirect(redirectUrl as string);
}

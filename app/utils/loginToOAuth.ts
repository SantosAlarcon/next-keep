"use server";

import type { Account, OAuthProvider } from "appwrite";
import { redirect } from "next/navigation";
import { getAccount } from "../appwrite";

export async function loginToOAuth(provider: OAuthProvider) {
	const account: Account = getAccount();
	const redirectUrl = account.createOAuth2Token({
		provider: provider,
		success: `${process.env.NEXT_PUBLIC_URL!}/api/oauth`,
		failure: `${process.env.NEXT_PUBLIC_URL!}/login`,
	});

	return redirect(redirectUrl as string);
}

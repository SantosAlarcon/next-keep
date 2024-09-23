"use server";

import type { Models } from "appwrite";
import { cookies } from "next/headers";

export const getSession = async () => {
	let session: Models.Session | undefined;
	try {
		/*if (process.env.NODE_ENV === "development") {
			session = JSON.parse(cookies().get("appwrite_session")!.value);
		} else {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/account`);
			session = await response.json();
		}*/
        const session = JSON.parse(cookies().get("appwrite_session")!.value);
		if (session) return session;
	} catch (error) {
		return null;
	}
};

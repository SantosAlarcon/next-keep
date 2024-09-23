"use server";

import { cookies } from "next/headers";

export const getSession = async () => {
	//let session: Models.Session | undefined;
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/account`);
		const session = await response.json();

		if (session) return session;

		/*const session = JSON.parse(cookies().get("appwrite_session")!.value);
        if (session) return session;*/
	} catch (error) {
		return null;
	}
};

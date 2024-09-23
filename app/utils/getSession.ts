"use server"

import { cookies } from "next/headers";

export const getSession = async () => {
	try {
		const session = JSON.parse(cookies().get("appwrite_session")!.value);
		if (session) return session;
	} catch (error) {
		return null;
	}
}

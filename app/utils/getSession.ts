"use server";
import { cookies } from "next/headers";

export const getSession = async () => {
	const cookieStore = cookies()
	const session = cookieStore.get("appwrite_session")?.value

	try {
		if (session) return JSON.parse(session);
	} catch (error) {
		return null;
	}
};

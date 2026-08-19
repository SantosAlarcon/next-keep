"use server";
import { cookies } from "next/headers";

export const getSession = async () => {
	const cookieStore = await cookies();
	const sessionData = cookieStore.get("appwrite_session")?.value;

	if (!sessionData) return null;

	try {
		const parsed = JSON.parse(sessionData);
		if (!parsed?.userId) return null;
		return parsed;
	} catch {
		return null;
	}
};

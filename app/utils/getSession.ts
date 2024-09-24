"use server";
import { headers } from "next/headers";

export const getSession = async () => {
	const headerList = headers();

	try {
		// @ts-ignore
		const session = JSON.parse(headerList.get("cookie")?.split(";")[0].replace("appwrite_session=", ""));
		if (session) return session;
	} catch (error) {
		return null;
	}
};

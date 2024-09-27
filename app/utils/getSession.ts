"use server";
import { headers } from "next/headers";

export const getSession = async () => {
	const headerList = headers();

	try {
		// @ts-ignore
		const session = decodeURIComponent(headerList.get("cookie")?.split(";")[0].replace("appwrite_session=", ""));
		if (session) return JSON.parse(session);
	} catch (error) {
		return null;
	}
};

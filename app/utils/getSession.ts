"use server";
import { headers } from "next/headers";

export const getSession = async () => {
	const headerList = headers();

	try {
		// @ts-ignore
		const cookieList = headerList.get("cookie")?.split("; ")
		let sessionCookie = cookieList?.find((cookie) => cookie.startsWith("appwrite_session"));

		/*if (!sessionCookie) {
			sessionCookie = cookieList?.find((cookie) => cookie.startsWith(" appwrite_session="));
		};
		console.log(sessionCookie)*/
		// @ts-ignore
		const session = decodeURIComponent(sessionCookie?.replace(`appwrite_session=`, ""));
		if (session) return JSON.parse(session);
	} catch (error) {
		return null;
	}
};

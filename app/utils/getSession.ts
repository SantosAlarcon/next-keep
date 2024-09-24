"use server";

import { headers } from "next/headers";

export const getSession = async () => {
	try {
		// @ts-ignore
		const session = JSON.parse(headers().get("cookie")?.split(";")[0].replace("appwrite_session=", ""));
		if (session) return session;
	} catch (error) {
		return null;
	}
};

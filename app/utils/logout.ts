"use server";

import { cookies } from "next/headers";
import { getSession } from "./getSession";

// This action removes the session cookie and deletes the user sessions from the Appwrite project
// using the Appwrite API.
export const logout = async () => {
	const cookieList = await cookies();
	try {
		const session = await getSession();
		await fetch(
			`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/users/${session.userId}/sessions`,
			{
				method: "DELETE",
				headers: {
					"X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
					"X-Appwrite-Key": process.env.APPWRITE_API_KEY!,
				},
			},
		).then(() => cookieList.delete("appwrite_session"));
	} catch (e) {
		console.error("Failed on logout");
	}
};

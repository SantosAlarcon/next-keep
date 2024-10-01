"use server"

import { cookies } from "next/headers";
import { appwriteAPIKey, appwriteProjectId } from "../constants";
import { getSession } from "./getSession"

export const logout = async () => {
	const cookieList = cookies()
	try {
		const session = await getSession();
		await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${session.userId}/sessions`, {
			method: "DELETE",
			headers: {
				"X-Appwrite-Project": appwriteProjectId,
				"X-Appwrite-Key": appwriteAPIKey
			}
		}).then(() => cookieList.delete("appwrite_session"))
	} catch (e) {
		console.error("Failed on logout")
	}
}

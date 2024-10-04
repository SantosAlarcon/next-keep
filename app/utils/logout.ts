"use server"

import { cookies } from "next/headers";
import { apiEndpoint, appwriteAPIKey, appwriteProjectId } from "../constants";
import { getSession } from "./getSession"

// This action removes the session cookie and deletes the user sessions from the Appwrite project
// using the Appwrite API.
export const logout = async () => {
	const cookieList = cookies()
	try {
		const session = await getSession();
		await fetch(`${apiEndpoint}/users/${session.userId}/sessions`, {
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

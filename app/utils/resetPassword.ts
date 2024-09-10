import { appwriteAccount } from "../appwrite";

export default async function resetPassword(lang: string, data: FormData) {
	const email = data.get("email")?.toString()

	if (!email) {
		return
	}

	await appwriteAccount.createRecovery(email, `http://localhost:3000/new-password/${lang}`)
}

import { toast } from "sonner"
import { appwriteAccount } from "../appwrite"
import initTranslations from "../i18n"

export async function emailLogin(data: FormData) {
	const email = data.get("email")
	const password = data.get("password")

	if (email && password) {
		// @ts-ignore
		appwriteAccount.createEmailPasswordSession(email, password)
			.then((response) => {
			})
			.catch((error) => toast.error(error.message))
	}

}

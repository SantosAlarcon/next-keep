import { toast } from "sonner"
import { appwriteAccount } from "../appwrite"
import initTranslations from "../i18n"
import { OAuthProvider } from "appwrite"

export async function emailLogin(data: FormData) {
	const email = data.get("email")
	const password = data.get("password")

	if (email && password) {
		// @ts-ignore
		appwriteAccount.createEmailPasswordSession(email, password)
			.then((response) => {
                console.log(response)
			})
			.catch((error) => toast.error(error.message))
	}
}

export async function loginToFacebook() {
    appwriteAccount.createOAuth2Session(
        OAuthProvider.Facebook, "https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/facebook/66a36b260022203773a5"
    )
}

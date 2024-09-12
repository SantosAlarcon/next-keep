import { OAuthProvider } from "appwrite"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { appwriteAccount } from "../appwrite"
import initTranslations from "../i18n"
import { localeStore } from "../store/localeStore"

export async function emailLogin(data: FormData) {
	const email = data.get("email")
	const password = data.get("password")
	// @ts-ignore
	const {t} = await initTranslations(localeStore.getState().locale, ["login"])

	if (email && password) {
		// @ts-ignore
		appwriteAccount.createEmailPasswordSession(email, password)
			.then(() => {
				redirect("/notes/all")
			})
			.catch((error) => {
                console.log(error)
                toast.error(t("login-error"))
            })
	}
}

export async function loginToFacebook() {
	appwriteAccount.createOAuth2Session(
		OAuthProvider.Facebook, "http://localhost:3000/notes/all"
	)
}

export async function loginToGoogle() {
	appwriteAccount.createOAuth2Session(
		OAuthProvider.Google, "http://localhost:3000/notes/all"
	)
}

export async function loginToGithub() {
	appwriteAccount.createOAuth2Session(
		OAuthProvider.Github, "http://localhost:3000/notes/all"
	)
}

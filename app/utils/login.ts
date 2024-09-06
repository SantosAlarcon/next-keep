import { toast } from "sonner"
import { appwriteAccount } from "../appwrite"
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

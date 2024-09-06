import { toast } from "sonner"
import initTranslations from "../i18n"
import { localeStore } from "../store/localeStore"
import { appwriteAccount } from "../appwrite"
import { ID } from "appwrite"

export const emailRegister = async (data: FormData) => {
    // @ts-ignore
    const lang = localeStore.getState().locale
    const {t} = await initTranslations(lang, ["register"])
    const email = data.get("email")?.toString()
    const password = data.get("password")?.toString()
    const confirmPassword = data.get("confirm-password")?.toString()

    // Validation
    // @ts-ignore
    if (password.length < 8) {
        toast.error(t("register-minimum-length"))
    } else if (password !== confirmPassword) {
        toast.error(t("register-passwords-dont-match"))
    } else {
        const userId: string = crypto.randomUUID()
        // Validation success
        // @ts-ignore
        await appwriteAccount.create(userId, email, password).then((response) => console.log(response))
    }
}

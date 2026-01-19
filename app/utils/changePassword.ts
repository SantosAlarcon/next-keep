import { toast } from "sonner";
import initTranslations from "../i18n";
import { appwriteAccount } from "../appwrite";

export async function changePassword(
	lang: string,
	data: FormData,
	email: string,
	secret: string,
) {
	const password = data.get("password")?.toString();
	const confirmPassword = data.get("confirm-password")?.toString();
	console.table({ password, confirmPassword });
	const { t } = await initTranslations(lang, ["new-password"]);

	// Validation
	// @ts-ignore
	if (password.length < 8) {
		toast.error(t("new-password-minimum-length"));
	} else if (password !== confirmPassword) {
		toast.error(t("new-password-passwords-dont-match"));
	} else {
		// Validation success
		// @ts-ignore
		const response = await appwriteAccount.updateRecovery(
			email,
			secret,
			password,
		);
		toast.success(t("new-password-success"));
		console.log(response);
	}
}

import Image from "next/image";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import LoginStyles from "@/app/styles/Login.module.css";
import { useTranslation } from "react-i18next";
import resetPassword from "@/app/utils/resetPassword";
import { useState } from "react";
import { toast } from "sonner";

const ResetPassword = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("reset-password", {
		lng: lang,
	});
	const [pending, setPending] = useState<boolean>(false);

	const submitResetPassword = (data: FormData) => {
		setPending(true);
		resetPassword(lang, data)
			.then(() =>
				toast.success(
					t("reset-password-success", { email: data.get("email") }),
				),
			)
			.finally(() => setPending(false));
	};

	return (
		<>
			<div className={LoginStyles.login__page__logo}>
				<Image
					className={LoginStyles.login__page__logo__icon}
					src="/NextKeep.svg"
					alt="Next Keep Logo"
					width={350}
					height={150}
					priority
				/>
				<Image
					className={LoginStyles.login__page__logo__text}
					src="/NextKeepTextOnly.svg"
					alt="Next Keep Logo"
					width={350}
					height={150}
					priority
				/>
			</div>
			<h1>{t("reset-password-title")}</h1>
			<hr />
			<form
				id="emailRegisterForm"
				action={submitResetPassword}
				className={LoginStyles.login__page__form}
			>
				<p>{t("reset-password-text")}</p>
				<FloatLabel>
					<InputText
						aria-label={t("reset-password-email")}
						aria-required
						type="email"
						className={LoginStyles.login__page__form__input}
						id="email"
						name="email"
						required
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="email"
					>
						{t("reset-password-email")}
					</label>
				</FloatLabel>
				<Button
					type="submit"
					aria-label={t("reset-password-title")}
                    // @ts-ignore
					label={
						pending ? (
							<span className="pi pi-spin pi-spinner" />
						) : (
							t("reset-password-title")
						)
					}
					className="p-button-rounded"
				/>
			</form>
		</>
	);
};

export default ResetPassword;

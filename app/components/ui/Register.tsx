import { Button } from "@primereact/ui/button";
import { FloatLabel } from "@primereact/ui/floatlabel";
import { InputPassword } from "@primereact/ui/inputpassword";
import { InputText } from "@primereact/ui/inputtext";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import LoginStyles from "@/app/styles/Login.module.css";
import { emailRegister } from "@/app/utils/register";

const Register = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("register", {
		lng: lang,
	});

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
			<h1>{t("register-title")}</h1>
			<hr />
			<form
				id="emailRegisterForm"
				action={emailRegister}
				className={LoginStyles.login__page__form}
			>
				<FloatLabel>
					<InputText
						aria-label={t("register-email")}
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
						{t("register-email")}
					</label>
				</FloatLabel>
				<FloatLabel>
					<InputPassword
						className={LoginStyles.login__page__form__input}
						aria-label={t("register-password")}
						aria-required
						id="password"
						name="password"
						required
						feedback={false}
						mask
						promptLabel={t("write-password")}
						strongLabel={t("strong-password")}
						weakLabel={t("weak-password")}
						mediumLabel={t("medium-password")}
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="password"
					>
						{t("register-password")}
					</label>
				</FloatLabel>
				<FloatLabel>
					<InputPassword
						className={LoginStyles.login__page__form__input}
						id="confirm-password"
						name="confirm-password"
						required
						feedback={false}
						aria-label={t("register-confirm-password")}
						aria-required
						mask
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="confirm-password"
					>
						{t("register-confirm-password")}
					</label>
				</FloatLabel>
				<Button
					type="submit"
					aria-label={t("register-title")}
					label={t("register-title")}
					className="p-button-rounded"
				/>
			</form>
		</>
	);
};

export default Register;

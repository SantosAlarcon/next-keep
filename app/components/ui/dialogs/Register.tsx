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
			<Image
				src="/NextKeep.svg"
				alt="Next Keep Logo"
				width={150}
				height={150}
				priority
			/>
			<h1>{t("register-title")}</h1>
			<hr />
			<form
				id="emailRegisterForm"
				action={emailRegister}
				className={LoginStyles.login__page__form}
			>
				<FloatLabel>
					<InputText
						type="email"
						aria-label={t("register-email")}
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
						id="password"
						name="password"
						required
						aria-label={t("register-password")}
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
						aria-label={t("register-confirm-password")}
						feedback={false}
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
					label={t("register-title")}
					aria-label={t("register-title")}
					className="p-button-rounded"
				/>
			</form>
		</>
	);
};

export default Register;

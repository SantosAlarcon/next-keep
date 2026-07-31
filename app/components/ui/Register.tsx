import { Button } from "@primereact/ui/button";
import { FloatLabel } from "@primereact/ui/floatlabel";
import { InputText } from "@primereact/ui/inputtext";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginStyles from "@/app/styles/Login.module.css";
import { emailRegister } from "@/app/utils/register";
import CustomPassword from "./CustomPassword";
import Spinner from "./Spinner";

const Register = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("register", {
		lng: lang,
	});

	const [pending, setPending] = useState<boolean>(false);

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
					<CustomPassword
						className={LoginStyles.login__page__form__input}
						aria-label={t("register-password")}
						aria-required
						id="password"
						name="password"
						required
						value={""}
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="password"
					>
						{t("register-password")}
					</label>
				</FloatLabel>
				<FloatLabel>
					<CustomPassword
						className={LoginStyles.login__page__form__input}
						id="confirm-password"
						name="confirm-password"
						required
						aria-label={t("register-confirm-password")}
						value={""}
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="confirm-password"
					>
						{t("register-confirm-password")}
					</label>
				</FloatLabel>
				<Button
					severity="secondary"
					type="submit"
					aria-label={t("register-title")}
					label={t("register-title")}
					className="p-button-rounded"
				>
					{pending ? (
						<Spinner width="16" height="16" color="" />
					) : (
						t("register-title")
					)}
				</Button>
			</form>
		</>
	);
};

export default Register;

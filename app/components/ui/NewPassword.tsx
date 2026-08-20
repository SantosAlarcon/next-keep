"use client";

import { Button } from "@primereact/ui/button";
import { FloatLabel } from "@primereact/ui/floatlabel";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginStyles from "@/app/styles/Login.module.css";
import { changePassword } from "@/app/utils/changePassword";
import BarLoader from "./BarLoader";
import CustomPassword from "./CustomPassword";
import Spinner from "./Spinner";

const NewPassword = ({ lang }: { lang: string }) => {
	const params = useSearchParams();
	const userId = params.get("userId");
	const secret = params.get("secret");
	const { t } = useTranslation("new-password", {
		lng: lang,
	});

	const [pending, setPending] = useState<boolean>(false);

	const submitChangePassword = (data: FormData) => {
		setPending(true);
		// @ts-ignore
		changePassword(lang, data, userId, secret).finally(() => setPending(false));
	};

	if (!userId && !secret) {
		return <p>{t("new-password-missing-params")}</p>;
	}

	return (
		<>
			<div className={LoginStyles.login__page__logo}>
				<Image
					className={LoginStyles.login__page__logo__icon}
					src="/NextKeep.svg"
					alt="Next Keep Logo"
					width={350}
					height={150}
				/>
				<Image
					className={LoginStyles.login__page__logo__text}
					src="/NextKeepTextOnly.svg"
					alt="Next Keep Logo"
					width={350}
					height={150}
				/>
			</div>
			<h1>{t("new-password-title")}</h1>
			<hr />
			<form
				id="newPasswordForm"
				action={(e) => submitChangePassword(e)}
				className={LoginStyles.login__page__form}
			>
				<FloatLabel>
					<CustomPassword
						className={LoginStyles.login__page__form__input}
						id="password"
						name="password"
						aria-label={t("new-password-password")}
						aria-required
						required
						value=""
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="password"
					>
						{t("new-password-password")}
					</label>
				</FloatLabel>
				<FloatLabel>
					<CustomPassword
						className={LoginStyles.login__page__form__input}
						id="confirm-password"
						name="confirm-password"
						aria-label={t("new-password-confirm-password")}
						aria-required
						required
						value=""
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="confirm-password"
					>
						{t("new-password-confirm-password")}
					</label>
				</FloatLabel>
				<Button
					severity="secondary"
					type="submit"
					aria-label={t("new-password-title")}
					aria-busy={pending}
					label={
						pending ? (
							<BarLoader color="#eee" width="20px" height="20px" />
						) : (
							t("new-password-title")
						)
					}
					className="p-button-rounded"
				/>
			</form>
		</>
	);
};

export default NewPassword;

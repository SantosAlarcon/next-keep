"use client";

import Image from "next/image";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import LoginStyles from "@/app/styles/Login.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import BarLoader from "./BarLoader";
import { changePassword } from "@/app/utils/changePassword";
import { useSearchParams } from "next/navigation";

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
		return <p>UserId and secret must be present to access the form.</p>;
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
			<h1>{t("new-password-title")}</h1>
			<hr />
			<form
				id="newPasswordForm"
				action={(e) => submitChangePassword(e)}
				className={LoginStyles.login__page__form}
			>
				<FloatLabel>
					<Password
						className={LoginStyles.login__page__form__input}
						id="password"
						name="password"
						aria-label={t("new-password-password")}
						aria-required
						required
						feedback={false}
						toggleMask
						promptLabel={t("write-password")}
						strongLabel={t("strong-password")}
						weakLabel={t("weak-password")}
						mediumLabel={t("medium-password")}
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="password"
					>
						{t("new-password-password")}
					</label>
				</FloatLabel>
				<FloatLabel>
					<Password
						className={LoginStyles.login__page__form__input}
						id="confirm-password"
						name="confirm-password"
						aria-label={t("new-password-confirm-password")}
						aria-required
						required
						feedback={false}
						toggleMask
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="confirm-password"
					>
						{t("new-password-confirm-password")}
					</label>
				</FloatLabel>
				{/* @ts-ignore */}
				<Button
					type="submit"
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

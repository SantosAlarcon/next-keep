import { Button } from "@primereact/ui/button";
import { FloatLabel } from "@primereact/ui/floatlabel";
import { InputPassword } from "@primereact/ui/inputpassword";
import { InputText } from "@primereact/ui/inputtext";
import { OAuthProvider } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import LoginStyles from "@/app/styles/Login.module.css";
import { emailLogin } from "@/app/utils/login";
import { loginToOAuth } from "@/app/utils/loginToOAuth";
import { Google } from "@primeicons/react/google";
import { Github } from "@primeicons/react/github";
import { Facebook } from "@primeicons/react/facebook";

const Login = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("login", {
		lng: lang,
	});

	const router = useRouter();
	const [pending, setPending] = useState<boolean>(false);

	const submitEmailLogin = (data: FormData) => {
		setPending(true);
		// @ts-ignore
		emailLogin(data)
			.then((response) => {
				document.cookie = `appwrite_session=${JSON.stringify(response)}; path=/;`;
				router.push("/notes/all");
			})
			.catch(() => toast.error(t("login-error")))
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
			<h1>{t("login-title")}</h1>
			<div className={LoginStyles.login__page__buttons}>
				<form
					action={() => loginToOAuth(OAuthProvider.Google)}
					className={LoginStyles.login__page__buttons__form}
				>
					<Button
						type="submit"
						aria-label={t("login-google")}
						label={t("login-google")}
						className="p-button-rounded"
					>
						<Google />
						{t("login-google")}
					</Button>
				</form>
				<form
					action={() => loginToOAuth(OAuthProvider.Github)}
					className={LoginStyles.login__page__buttons__form}
				>
					<Button
						type="submit"
						aria-label={t("login-github")}
						label={t("login-github")}
						icon="pi pi-github"
						className="p-button-rounded"
					>
						<Github />
						{t("login-github")}
					</Button>
				</form>
				<form
					action={() => loginToOAuth(OAuthProvider.Facebook)}
					className={LoginStyles.login__page__buttons__form}
				>
					<Button
						type="submit"
						aria-label={t("login-facebook")}
						label={t("login-facebook")}
						icon="pi pi-facebook"
						className="p-button-rounded"
					>
						<Facebook />
						{t("login-facebook")}
					</Button>
				</form>
			</div>
			<Link href={`/reset-password`} aria-label={t("forgot-password")}>
				{t("forgot-password")}
			</Link>
			<Link href={`/register`} aria-label={t("register")}>
				{t("register")}
			</Link>

			<hr />
			<form
				id="emailLoginForm"
				action={submitEmailLogin}
				className={LoginStyles.login__page__form}
			>
				<FloatLabel>
					<InputText
						aria-label={t("email")}
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
						{t("email")}
					</label>
				</FloatLabel>
				<FloatLabel>
					<InputPassword
						className={LoginStyles.login__page__form__input}
						id="password"
						name="password"
						required
						mask
						aria-label={t("password")}
						aria-required
					/>
					<label
						className={LoginStyles.login__page__form__label}
						htmlFor="password"
					>
						{t("password")}
					</label>
				</FloatLabel>
				<Button
					type="submit"
					aria-label={t("login")}
					// @ts-ignore
					label={
						pending ? <span className="pi pi-spin pi-spinner" /> : t("login")
					}
					className="p-button-rounded"
				>
					{pending ? <span className="pi pi-spin pi-spinner" /> : t("login")}
				</Button>
			</form>
		</>
	);
};

export default Login;

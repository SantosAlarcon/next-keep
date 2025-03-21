import Image from 'next/image'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import LoginStyles from '@/app/styles/Login.module.css'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { emailLogin } from '@/app/utils/login'
import { loginToOAuth } from '@/app/utils/loginToOAuth'
import { OAuthProvider } from 'node-appwrite'

const Login = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("login", {
		lng: lang,
	})

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
	}

	return (
		<>
            <div className={LoginStyles.login__page__logo}>
                <Image className={LoginStyles.login__page__logo__icon} src="/NextKeep.svg" alt="Next Keep Logo" width={350} height={150} priority />
                <Image className={LoginStyles.login__page__logo__text} src="/NextKeepTextOnly.svg" alt="Next Keep Logo" width={350} height={150} priority />
            </div>
			<h1>{t("login-title")}</h1>
			<div className={LoginStyles.login__page__buttons}>
				<form action={() => loginToOAuth(OAuthProvider.Google)} className={LoginStyles.login__page__buttons__form}>
					<Button type="submit" aria-label={t("login-google")} label={t("login-google")} icon="pi pi-google" className="p-button-rounded" />
				</form>
				<form action={() => loginToOAuth(OAuthProvider.Github)} className={LoginStyles.login__page__buttons__form}>
					<Button type="submit" aria-label={t("login-github")} label={t("login-github")} icon="pi pi-github" className="p-button-rounded" />
				</form>
				<form action={() => loginToOAuth(OAuthProvider.Facebook)} className={LoginStyles.login__page__buttons__form}>
					<Button type="submit" aria-label={t("login-facebook")} label={t("login-facebook")} icon="pi pi-facebook" className="p-button-rounded" />
				</form>
			</div>
			<Link href={`/reset-password/${lang}`} aria-label={t("forgot-password")}>
				{t("forgot-password")}
			</Link>
			<Link href={`/register/${lang}`} aria-label={t("register")}>
				{t("register")}
			</Link>

			<hr />
			<form id="emailLoginForm" action={submitEmailLogin} className={LoginStyles.login__page__form}>
				<FloatLabel>
					<InputText aria-label={t("email")} aria-required type="email" className={LoginStyles.login__page__form__input} id="email" name="email" required />
					<label className={LoginStyles.login__page__form__label} htmlFor="email">{t("email")}</label>
				</FloatLabel>
				<FloatLabel>
					<Password
						className={LoginStyles.login__page__form__input}
						id="password"
						name="password"
						required
						feedback={false}
						toggleMask
						aria-label={t("password")}
						aria-required
					/>
					<label className={LoginStyles.login__page__form__label} htmlFor="password">{t("password")}</label>
				</FloatLabel>
				{ /* @ts-ignore */}
				<Button type="submit" aria-label={t("login")} label={pending ? <span className="pi pi-spin pi-spinner" /> : t("login")} className="p-button-rounded" />
			</form>
		</>
	)
}

export default Login

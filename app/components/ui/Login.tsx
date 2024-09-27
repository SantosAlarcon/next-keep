import Image from 'next/image'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import LoginStyles from '@/app/styles/Login.module.css'
import { emailLogin, loginToFacebook, loginToGithub } from '@/app/utils/login'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { loginToGoogle } from '@/app/utils/loginToGoogle'

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
			<Image src="/NextKeep.svg" alt="Next Keep Logo" width={150} height={150} priority />
			<h1>{t("login-title")}</h1>
			<div className={LoginStyles.login__page__buttons}>
				<form action={loginToGoogle} className={LoginStyles.login__page__buttons__form}>
				    <Button type="submit" label={t("login-google")} icon="pi pi-google" className="p-button-rounded" />
				</form>
				<Button onClick={loginToGithub} label={t("login-github")} icon="pi pi-github" className="p-button-rounded" />
				<Button onClick={loginToFacebook} label={t("login-facebook")} icon="pi pi-facebook" className="p-button-rounded" />
			</div>
			<Link href={`/reset-password/${lang}`}>
				{t("forgot-password")}
			</Link>
			<Link href={`/register/${lang}`}>
				{t("register")}
			</Link>

			<hr />
			<form id="emailLoginForm" action={submitEmailLogin} className={LoginStyles.login__page__form}>
				<FloatLabel>
					<InputText type="email" className={LoginStyles.login__page__form__input} id="email" name="email" required />
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
					/>
					<label className={LoginStyles.login__page__form__label} htmlFor="password">{t("password")}</label>
				</FloatLabel>
				{ /* @ts-ignore */}
				<Button type="submit" label={pending ? <span className="pi pi-spin pi-spinner" /> : t("login")} className="p-button-rounded" />
			</form>
		</>
	)
}

export default Login

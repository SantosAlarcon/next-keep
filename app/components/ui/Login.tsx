import Image from 'next/image'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import LoginStyles from '@/app/styles/Login.module.css'
import { emailLogin, loginToFacebook, loginToGithub, loginToGoogle } from '@/app/utils/login'
import { useTranslation } from 'react-i18next'

const Login = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("login", {
		lng: lang,
	})

	return (
		<>
			<Image src="/NextKeep.svg" alt="Next Keep Logo" width={150} height={150} priority />
			<h1>{t("login-title")}</h1>
			<Button onClick={loginToGoogle} label={t("login-google")} icon="pi pi-google" className="p-button-rounded" />
			<Button onClick={loginToGithub} label={t("login-github")} icon="pi pi-github" className="p-button-rounded" />
			<Button onClick={loginToFacebook} label={t("login-facebook")} icon="pi pi-facebook" className="p-button-rounded" />
			<hr />
			<form id="emailLoginForm" action={emailLogin} className={LoginStyles.login__page__form}>
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
				<Button type="submit" label={t("login")} className="p-button-rounded" />
			</form>
		</>
	)
}

export default Login

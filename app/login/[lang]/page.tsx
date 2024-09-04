import initTranslations from '@/app/i18n'
import Image from 'next/image'
import React from 'react'
import LoginStyles from "@/styles/Login.module.css"
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

const LoginPage = async ({ params: { lang } }: { params: { lang: string } }) => {
	const { t } = await initTranslations(lang, ["login"])
	return (
		<main>
			<section className={LoginStyles.login__page__container}>
				<div className={LoginStyles.login__page__left}>
					<Image src="/NextKeep.svg" alt="Next Keep Logo" width={150} height={150} />
					<h1>{t("title")}</h1>
					<Button label={t("login-google")} icon="pi pi-google" className="p-button-rounded" />
					<Button label={t("login-github")} icon="pi pi-github" className="p-button-rounded" />
					<Button disabled label={t("login-facebook")} icon="pi pi-facebook" className="p-button-rounded" />
					<hr />
					<form>
						<FloatLabel>
							<InputText id="email" name="email" required />
							<label htmlFor="email">{t("email")}</label>
						</FloatLabel>
						<FloatLabel>
							<Password id="password" name="password" required feedback={false} toggleMask />
							<label htmlFor="password">{t("password")}</label>
						</FloatLabel>
						<Button type="submit" label={t("login")} className="p-button-rounded" />
					</form>
				</div>
				<div className={LoginStyles.login__page__right}>
					Aquí falta añadir una imágen
				</div>
			</section>
		</main>
	)
}

export default LoginPage

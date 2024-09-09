import Image from 'next/image'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import LoginStyles from '@/app/styles/Login.module.css'
import { useTranslation } from 'react-i18next'
import resetPassword from '@/app/utils/resetPassword'

const ResetPassword = ({ lang }: { lang: string }) => {
	const { t } = useTranslation("reset-password", {
		lng: lang,
	})

	return (
		<>
			<Image src="/NextKeep.svg" alt="Next Keep Logo" width={150} height={150} priority />
			<h1>{t("reset-password-title")}</h1>
			<hr />
			<form id="emailRegisterForm" action={resetPassword} className={LoginStyles.login__page__form}>
				<FloatLabel>
					<InputText type="email" className={LoginStyles.login__page__form__input} id="email" name="email" required />
					<label className={LoginStyles.login__page__form__label} htmlFor="email">{t("reset-password-email")}</label>
				</FloatLabel>
				<FloatLabel>
					<Password
						className={LoginStyles.login__page__form__input}
						id="password"
						name="password"
						required
						feedback={false}
						toggleMask
                        promptLabel={t("write-password")}
                        strongLabel={t("strong-password")}
                        weakLabel={t("weak-password")}
                        mediumLabel={t("medium-password")}
					/>
					<label className={LoginStyles.login__page__form__label} htmlFor="password">{t("reset-password-password")}</label>
				</FloatLabel>
				<FloatLabel>
					<Password
						className={LoginStyles.login__page__form__input}
						id="confirm-password"
						name="confirm-password"
						required
						feedback={false}
						toggleMask
					/>
					<label className={LoginStyles.login__page__form__label} htmlFor="confirm-password">{t("reset-password-confirm-password")}</label>
				</FloatLabel>
				<Button type="submit" label={t("reset-password-title")} className="p-button-rounded" />
			</form>
		</>
	)
}

export default ResetPassword

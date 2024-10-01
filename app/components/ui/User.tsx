"use client"
import { localeStore } from '@/app/store/localeStore'
import UserStyles from '@/app/styles/User.module.css'
import { logout } from '@/app/utils/logout'
import Image from 'next/image'
import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'

const User = () => {
	// @ts-ignore
	const { locale } = localeStore.getState();
	const {t} = useTranslation("common", { lng: locale })

	const handleLogout = () => {
		// @ts-ignore
		logout().then(() => {
			window.location.assign(`/login/${locale}`);
		})
	}


	return (
		<Button tooltip={t("logout")} tooltipOptions={{ position: "top" }} icon="pi pi-sign-out" className={UserStyles.user__container} onClick={handleLogout} />
	)
}

export default User

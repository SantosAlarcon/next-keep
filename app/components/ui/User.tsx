"use client"
import { localeStore } from '@/app/store/localeStore'
import UserStyles from '@/app/styles/User.module.css'
import { logout } from '@/app/utils/logout'

const User = () => {
	// @ts-ignore
	const { locale } = localeStore.getState();

	const handleLogout = () => {
		// @ts-ignore
		logout().then(() => {
			window.location.assign(`/login/${locale}`);
		})
	}


	return (
		<section onClick={handleLogout} className={UserStyles.user__container}>
			{/* <img className={UserStyles.user__avatar} title={session?.name} src={initials.href} width={50} height={50} /> */}
		</section>
	)
}

export default User

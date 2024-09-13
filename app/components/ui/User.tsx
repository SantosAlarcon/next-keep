"use client"
import { appwriteAccount, getInitials } from '@/app/appwrite'
import { authStore } from '@/app/store/authStore'
import { localeStore } from '@/app/store/localeStore'
import UserStyles from '@/app/styles/User.module.css'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const User = () => {
	const [initials, setInitials] = useState<URL>();
	const [session, setSession] = useState<Models.Preferences>();

	useEffect(() => {
		const pepe = getInitials();
		setInitials(new URL(pepe));
		// @ts-ignore
		const session = authStore.getState().session
		setSession(session)
		//appwriteAccount.get().then((account) => setSession(account)).catch((error) => toast.error(error.message))
	}, [])

	const logout = () => {
		// @ts-ignore
		const {locale} = localeStore.getState()
		appwriteAccount.deleteSession("current").then(() => window.location.assign(`/login/${locale}`)).catch((error) => toast.error(error.message))
	}

	if (!initials) return null;

	return (
		<section onClick={logout} className={UserStyles.user__container}>
			<img className={UserStyles.user__avatar} title={session?.name} src={initials.href} width={50} height={50} />
		</section>
	)
}

export default User

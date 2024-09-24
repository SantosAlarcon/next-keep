"use client"
import { appwriteAccount, getInitials } from '@/app/appwrite'
import { localeStore } from '@/app/store/localeStore'
import UserStyles from '@/app/styles/User.module.css'
import { getSession } from '@/app/utils/getSession'
import { Models } from 'appwrite'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const User = () => {
	// const [initials, setInitials] = useState<ArrayBuffer>();
	const [session, setSession] = useState<Models.Preferences>();

	useEffect(() => {
		// getInitials().then((response) => setInitials(response));
		// @ts-ignore
		getSession().then((session) => setSession(session))
	}, [])

	const logout = () => {
		// @ts-ignore
		const {locale} = localeStore.getState()
		appwriteAccount.deleteSession("current").then(() => window.location.assign(`/login/${locale}`)).catch((error) => toast.error(error.message))
	}


	return (
		<section onClick={logout} className={UserStyles.user__container}>
			{/* <img className={UserStyles.user__avatar} title={session?.name} src={initials.href} width={50} height={50} /> */}
		</section>
	)
}

export default User
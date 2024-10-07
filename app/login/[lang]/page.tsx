"use client"

import LoginStyles from "@/styles/Login.module.css";
import Login from "@/app/components/ui/Login";
import Image from "next/image";
import "@/app/i18n-client"

const LoginPage = ({ params: { lang } }: { params: { lang: string } }) => {
	return (
		<main className={LoginStyles.login__page__container}>
			<section className={LoginStyles.login__page__box}>
				<div className={LoginStyles.login__page__left}>
					<Login lang={lang} />
				</div>
				<div className={LoginStyles.login__page__right}>
					<Image className={LoginStyles.login__page__right__image} priority src="/mockup.webp" alt="Next Keep Mockup" width={1280} height={762} />
				</div>
			</section>
		</main>
	);
};

export default LoginPage;

"use client"

import LoginStyles from "@/styles/Login.module.css";
import Image from "next/image";
import "@/app/i18n-client"
import Register from "@/app/components/ui/Register";

const RegisterPage = ({ params: { lang } }: { params: { lang: string } }) => {
	return (
		<main className={LoginStyles.login__page__container}>
			<section className={LoginStyles.login__page__box}>
				<div className={LoginStyles.login__page__left}>
					<Register lang={lang} />
				</div>
				<div className={LoginStyles.login__page__right}>
					<Image priority src="/mockup.webp" alt="Next Keep Mockup" width={608} height={401} />
				</div>
			</section>
		</main>
	);
};

export default RegisterPage;

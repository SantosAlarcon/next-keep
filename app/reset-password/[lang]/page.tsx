"use client"

import LoginStyles from "@/styles/Login.module.css";
import Image from "next/image";
import "@/app/i18n-client"
import ResetPassword from "@/app/components/ui/ResetPassword";

const ResetPasswordPage = ({ params: { lang } }: { params: { lang: string } }) => {
	return (
		<main className={LoginStyles.login__page__container}>
			<section className={LoginStyles.login__page__box}>
				<div className={LoginStyles.login__page__left}>
					<ResetPassword lang={lang} />
				</div>
				<div className={LoginStyles.login__page__right}>
					<Image priority src="/mockup.webp" alt="Next Keep Mockup" width={720} height={465} />
				</div>
			</section>
		</main>
	);
};

export default ResetPasswordPage;

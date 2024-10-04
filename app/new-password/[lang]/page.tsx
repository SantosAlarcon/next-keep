"use client"

import LoginStyles from "@/styles/Login.module.css";
import Image from "next/image";
import "@/app/i18n-client"
import NewPassword from "@/app/components/ui/NewPassword";

const NewPasswordPage = ({ params: { lang } }: { params: { lang: string } }) => {
	return (
		<main className={LoginStyles.login__page__container}>
			<section className={LoginStyles.login__page__box}>
				<div className={LoginStyles.login__page__left}>
					<NewPassword lang={lang} />
				</div>
				<div className={LoginStyles.login__page__right}>
					<Image className={LoginStyles.login__page__right__image} priority src="/mockup.webp" alt="Next Keep Mockup" width={608} height={401} />
				</div>
			</section>
		</main>
	);
};

export default NewPasswordPage;

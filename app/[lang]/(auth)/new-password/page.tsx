"use client";

import Image from "next/image";
import LoginStyles from "@/styles/Login.module.css";
import "@/app/i18n-client";
import { use } from "react";
import NewPassword from "@/app/components/ui/NewPassword";

const NewPasswordPage = ({ params }: { params: Promise<{ lang: string }> }) => {
	const { lang } = use(params);
	return (
		<main className={LoginStyles.login__page__container}>
			<section className={LoginStyles.login__page__box}>
				<div className={LoginStyles.login__page__left}>
					<NewPassword lang={lang} />
				</div>
				<div className={LoginStyles.login__page__right}>
					<Image
						className={LoginStyles.login__page__right__image}
						priority
						src="/mockup.webp"
						alt="Next Keep Mockup"
						width={1280}
						height={762}
					/>
				</div>
			</section>
		</main>
	);
};

export default NewPasswordPage;

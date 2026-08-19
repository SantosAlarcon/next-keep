"use client";

import LoginStyles from "@/styles/Login.module.css";
import Image from "next/image";
import "@/app/i18n-client";
import Register from "@/app/components/ui/Register";
import { use } from "react";

const RegisterPage = ({ params }: { params: Promise<{ lang: string }> }) => {
	const { lang } = use(params);
	return (
		<main className={LoginStyles.login__page__container} id="main-content">
			<section className={LoginStyles.login__page__box}>
				<div className={LoginStyles.login__page__left}>
					<Register lang={lang} />
				</div>
				<div className={LoginStyles.login__page__right}>
				<Image
					className={LoginStyles.login__page__right__image}
					sizes="(max-width: 768px) 100vw, 50vw"
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

export default RegisterPage;

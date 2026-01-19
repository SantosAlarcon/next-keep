"use client";

import i18nClient from "@/app/i18n-client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

const BackButton = ({ lang }: { lang: string }) => {
	const t = i18nClient.getFixedT(lang, "common");
	const router = useRouter();
	return (
		<Button
			aria-label={t("back")}
			tooltip={t("back")}
			tooltipOptions={{ position: "bottom" }}
			icon="pi pi-arrow-left"
			onClick={() => router.back()}
		/>
	);
};

export default BackButton;

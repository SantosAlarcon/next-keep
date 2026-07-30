"use client";

import { ArrowLeft } from "@primeicons/react/arrow-left";
import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";

const BackButton = () => {
	const { t } = useT("common");
	const router = useRouter();
	return (
		<Button
			aria-label={t("back")}
			tooltip={t("back")}
			tooltipoptions={{ position: "bottom" }}
			onClick={() => router.back()}
		>
			<ArrowLeft />
			{t("back")}
		</Button>
	);
};

export default BackButton;

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
			severity="secondary"
			aria-label={t("back")}
			onClick={() => router.back()}
		>
			<ArrowLeft />
			{t("back")}
		</Button>
	);
};

export default BackButton;

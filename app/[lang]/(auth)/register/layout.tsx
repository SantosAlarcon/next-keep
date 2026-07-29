import type { ReactNode } from "react";
import "@/styles/globals.css";
import "@/styles/primereact.css";
import { Toaster } from "sonner";
import { LocaleSync } from "@/app/components/LocaleSync";
import initTranslations from "@/app/i18n";
import i18NextConfig from "@/i18n.config";

export function generateStaticParams() {
	return i18NextConfig.supportedLngs.map((locale: string) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	const { t } = await initTranslations(lang, ["register"]);
	return {
		title: `${t("register-title")}`,
	};
}

export default async function RegisterLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	return (
		<>
			<LocaleSync state={{ locale: lang }} />
			<Toaster richColors position="top-center" />
			{children}
		</>
	);
}

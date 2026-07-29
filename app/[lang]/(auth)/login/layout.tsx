import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthSync } from "@/app/components/AuthSync";
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
	const { t } = await initTranslations(lang, ["login"]);
	return {
		title: `${t("login-title")}`,
	};
}

export default async function LoginLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	return (
		<>
			<AuthSync
				// @ts-ignore
				state={{
					session: null,
					user: null,
				}}
			/>
			<LocaleSync state={{ locale: lang }} />
			<Toaster richColors position="top-center" />
			{children}
		</>
	);
}

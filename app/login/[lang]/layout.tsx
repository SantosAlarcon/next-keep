import type { ReactNode } from "react";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/globals.css";
import "@/styles/primereact.css";
import i18NextConfig from "@/i18n.config";
import initTranslations from "@/app/i18n";
import { Figtree } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "sonner";
import { LocaleSync } from "@/app/components/LocaleSync";
import { AuthSync } from "@/app/components/AuthSync";

const font = Figtree({ subsets: ["latin"], weight: ["400", "700", "900"] });

export function generateStaticParams() {
	return i18NextConfig.i18n.locales.map((locale: string) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
	const { t } = await initTranslations(lang, ["login"]);
	return {
		title: `${t("login-title")} - Next Keep`,
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
		<html lang={lang} suppressHydrationWarning>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/NextKeep.svg" />
			</head>
			<body className={font.className}>
				<PrimeReactProvider value={{ ripple: true }}>
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
				</PrimeReactProvider>
			</body>
		</html>
	);
}

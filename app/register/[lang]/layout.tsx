import type { ReactNode } from "react"
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/globals.css"
import "@/styles/primereact.css"
import i18NextConfig from "@/i18n.config"
import initTranslations from "@/app/i18n";
import { Figtree } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "sonner";
import { LocaleSync } from "@/app/components/LocaleSync";

const font = Figtree({ subsets: ["latin"], weight: ["400", "700", "900"] });

export function generateStaticParams() {
	return i18NextConfig.i18n.locales.map((locale: string) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
	const { lang } = await params;
	const { t } = await initTranslations(lang, ["register"])
	return {
		title: `${t("register-title")} - Next Keep`
	}
}

export default async function RegisterLayout({
	children,
	params
}: {
	children: ReactNode,
	params: Promise<{ lang: string }>
}) {
	const { lang } = await params;
	return (
		<html lang={lang}>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/NextKeep.svg" />
			</head>
			<body className={font.className}>
				<PrimeReactProvider value={{ ripple: true }}>
					<LocaleSync state={{ locale: lang }} />
					<Toaster richColors position="top-center" />
					{children}
				</PrimeReactProvider>
			</body>
		</html>
	)
}


import type { ReactNode } from "react"
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/styles/globals.css"
import "@/styles/primereact.css"
import i18NextConfig from "@/i18n.config"
import initTranslations from "@/app/i18n";
import { Lato } from "next/font/google";

const font = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export function generateStaticParams() {
	return i18NextConfig.i18n.locales.map((locale: string) => ({ locale }));
}

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
	const { t } = await initTranslations(lang, [ "login" ])
	return {
		title: `${t("title")} - Next Keep`
	}
}

export default function LoginLayout({ 
    children,
    params: { lang }
}: { 
    children: ReactNode,
    params: { lang: string } 
}) {
	return (
		<html lang={lang}>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/NextKeep.svg" />
			</head>
			<body className={font.className}>
				{children}
			</body>
		</html>
	)
}


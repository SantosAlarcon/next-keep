import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import {
	generateI18nStaticParams,
	getResources,
	getT,
	initServerI18next,
} from "next-i18next/server";
import type { ReactNode } from "react";
import "../styles/globals.css";
import "../styles/primereact.css";
import { PrimeReactProvider } from "@primereact/core";
import { I18nProvider } from "next-i18next/client";
import i18nConfig from "@/i18n.config";
import { LocaleSync } from "../components/LocaleSync";
import Ice from "../themes/ice";

const font = Figtree({ subsets: ["latin"], weight: ["400", "700", "800"] });

export const dynamic = "force-dynamic";

initServerI18next(i18nConfig);

export async function generateStaticParams() {
	return generateI18nStaticParams();
}

export const metadata: Metadata = {
	title: {
		template: "%s - Next Keep",
		default: "Next Keep",
	},
	description: "Organize your thoughs in one place, everywhere",
	icons: {
		icon: "/NextKeep.svg",
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: ReactNode;
	params: Promise<{
		lang: string;
	}>;
}>) {
	const { lang } = await params;
	const { i18n } = await getT();
	const resources = getResources(i18n);

	if (lang === "undefined") return null;

	return (
		<html lang={lang}>
			<body className={font.className}>
				<I18nProvider language={lang} resources={resources}>
					<LocaleSync state={{ locale: lang }} />
					<PrimeReactProvider
						theme={{
							preset: Ice,
							options: {
								cssVariables: true,
							},
						}}
					>
						{children}
					</PrimeReactProvider>
				</I18nProvider>
			</body>
		</html>
	);
}

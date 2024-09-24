import i18NextConfig from "@/i18n.config";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import type { ReactNode } from "react";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/primereact.css";
import { PrimeReactProvider } from "primereact/api";
import { Toaster } from "sonner";
import { DataSync } from "../components/DataSync";
import { LocaleSync } from "../components/LocaleSync";
import MobileHeader from "../components/ui/MobileHeader";
import { getAllData } from "../utils/getAllData";
import dynamic2 from "next/dynamic";

const font = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export async function generateStaticParams() {
	return i18NextConfig.i18n.locales.map((locale: string) => ({ locale }));
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

export const dynamic = "force-dynamic"

const SidebarClientNoSSR = dynamic2(() => import("@/components/SidebarClient"), { ssr: false });

export default async function RootLayout({
	children,
	params: { lang },
}: Readonly<{
	children: ReactNode;
	params: {
		lang: string;
	};
}>) {
    const state = await getAllData();

	return (
		<html lang={lang}>
			<body className={font.className}>
				{/* @ts-ignore */}
				<DataSync state={state} />
				<LocaleSync state={{ locale: lang }} />
				<PrimeReactProvider value={{ ripple: true }}>
					<Toaster richColors position="bottom-center" theme="dark" />
					<MobileHeader lang={lang} />
					<div className="main__body">
						<SidebarClientNoSSR params={{ lang: lang }} />
						{children}
					</div>
				</PrimeReactProvider>
			</body>
		</html>
	);
}

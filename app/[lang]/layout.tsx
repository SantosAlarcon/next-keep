import type { Metadata } from "next";
import { Lato } from "next/font/google";
import type { ReactNode } from "react";
import i18NextConfig from "@/i18n.config";
import { Toaster } from "sonner";
import { getAllData } from "../utils/getAllData";
import dynamic from "next/dynamic";
import "primereact/resources/themes/viva-dark/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/primereact.css";
import { PrimeReactProvider } from "primereact/api";
import { DataSync } from "../components/DataSync";

const font = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

export async function generateStaticParams() {
	return i18NextConfig.i18n.locales.map((locale: string) => ({ locale }));
}

const SidebarClientNoSSR = dynamic(() => import("@/components/SidebarClient"), { ssr: false });

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
                <DataSync state={state} />
				<PrimeReactProvider value={{ ripple: true }}>
					<Toaster richColors position="bottom-center" theme="dark" />
					<SidebarClientNoSSR params={{ lang: lang }} />
					{children}
				</PrimeReactProvider>
			</body>
		</html>
	);
}

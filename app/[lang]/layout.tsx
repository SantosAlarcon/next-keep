import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import type { ReactNode } from "react";
import i18NextConfig from "@/i18n.config";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
    return i18NextConfig.i18n.locales.map((locale: string) => ({ locale }));
}

export const metadata: Metadata = {
    title: "Next Keep",
    description: "Organize your thoughs in one place, everywhere",
    icons: {
	    icon: "/NextKeep.svg",
    }
};

export default function RootLayout({
    children,
    params: { lang },
}: Readonly<{
    children: ReactNode;
    params: {
        lang: string;
    };
}>) {
    return (
        <html lang={lang}>
            <body className={inter.className}>
                <Sidebar />
                {children}
            </body>
        </html>
    );
}

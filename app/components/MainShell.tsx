"use client";

import type { ReactNode } from "react";
import { useKeyboardShortcuts } from "@/app/utils/hooks/useKeyboardShortcuts";
import MobileHeader from "./ui/MobileHeader";

const MainShell = ({
	children,
	lang,
}: {
	children: ReactNode;
	lang: string;
}) => {
	useKeyboardShortcuts(lang);

	return (
		<>
			<MobileHeader lang={lang} />
			{children}
		</>
	);
};

export default MainShell;

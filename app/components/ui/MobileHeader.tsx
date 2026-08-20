"use client";

import { Bars } from "@primeicons/react/bars";
import { Button } from "@primereact/ui/button";
import { Sidebar } from "@primereact/ui/sidebar";
import Link from "next/link";
import mobileHeaderStyles from "@/app/styles/MobileHeader.module.css";

const MobileHeader = ({ lang }: { lang: string }) => {
	return (
		<header className={mobileHeaderStyles.mobile__header}>
			<Sidebar.Trigger
				as={Button}
				severity="secondary"
				iconOnly
				aria-label="Open menu"
			>
				<Bars />
			</Sidebar.Trigger>
			<Link href={`/${lang}/notes/all`} prefetch aria-label="Next Keep logo">
				<img
					className={mobileHeaderStyles.mobile__header__logo}
					src="/NextKeep.svg"
					alt="Next Keep logo"
					width="32"
					height="32"
				/>
			</Link>
		</header>
	);
};

export default MobileHeader;

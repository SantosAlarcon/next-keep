"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import sideBarStyles from "../../styles/sidebar.module.css"

const ActiveLink = ({ href, children }: {href: string, children: ReactNode}) => {
	const pathName = usePathname();
    console.table([href, pathName])

	return (
		<Link href={href} className={pathName === href ? sideBarStyles.sidebar__active : ""}>
			{children}
		</Link>
	);
};

export default ActiveLink;

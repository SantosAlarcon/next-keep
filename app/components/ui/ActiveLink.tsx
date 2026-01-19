"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import sideBarStyles from "../../styles/sidebar.module.css";

const ActiveLink = ({
	href,
	children,
	title,
}: {
	href: string;
	children: ReactNode;
	title: string;
}) => {
	const pathName = usePathname();
	const path = pathName.slice(3);

	return (
		<Link
			href={href}
			aria-label={title}
			className={`${sideBarStyles.sidebar__item} ${href === path ? sideBarStyles.sidebar__active : ""}`}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import sideBarStyles from "../../styles/sidebar.module.css";

const ActiveLink = ({ href, children }: { href: string; children: ReactNode }) => {
    const pathName = usePathname();
    const path = pathName.slice(3)

    return (
        <Link href={href} className={`${sideBarStyles.sidebar__item} ${href === path ? sideBarStyles.sidebar__active : ""}`}>
            {children}
        </Link>
    );
};

export default ActiveLink;

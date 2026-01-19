"use client";

import Link from "next/link";
import noteStyles from "@/app/styles/NoteList.module.css";
import type { ReactNode } from "react";

const ActiveNoteLink = ({
	href,
	selected,
	children,
	title,
}: {
	href: string;
	selected: boolean;
	children: ReactNode;
	title: string;
}) => {
	return (
		<Link
			href={href}
			className={`${noteStyles.note__item__link} ${selected ? noteStyles.note__item__selected : ""}`}
			aria-label={title}
		>
			{children}
		</Link>
	);
};

export default ActiveNoteLink;

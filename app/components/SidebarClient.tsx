"use client";

import Image from "next/image";
import Link from "next/link";
import { mainSidebarLinks } from "../constants";
import sidebarStyles from "../styles/sidebar.module.css";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import NewNoteButton from "./ui/NewNoteButton";
import { useState } from "react";
import type { Note, Group } from "../types";
import i18nClient from "../i18n-client";
import getCookie from "../utils/getCookie";

const SidebarClient = ({
	params: { lang },
	data: { allNotes, allPinnedNotes, allGroups, allNoteAmounts },
}: { params: { lang: string }; data: { allNotes: Note[]; allPinnedNotes: Note[]; allGroups: Group[]; allNoteAmounts: object } }) => {
	const [expanded, setExpanded] = useState<boolean>(() => {
		// @ts-ignore
		if (!getCookie("sidebar_expanded")) {
			document.cookie = "sidebar_expanded = true";
		}

		// @ts-ignore
		if (getCookie("sidebar_expanded") === "true") {
			return true;
		} else {
			return false;
		}
	});
	const t = i18nClient.getFixedT(lang, "common");

	const handleClick = () => {
		setExpanded(!expanded);
		document.cookie = `sidebar_expanded = ${!expanded}`;
	};

	if (!i18nClient) return null;

	return (
		<aside
			style={{
				width: expanded ? "23rem" : "fit-content",
			}}
			className={sidebarStyles.sidebar__container}
		>
			<Link href="/notes/all" prefetch>
				<Image
					className={sidebarStyles.sidebar__logo}
					src="/NextKeep.svg"
					alt="Next Keep logo"
					width={expanded ? "100" : "50"}
					height={expanded ? "100" : "50"}
					priority
				/>
			</Link>
			<NewNoteButton title={t("create-note")} expanded={expanded} />
			<ul className={sidebarStyles.sidebar__grouplist}>
				{mainSidebarLinks.map((link) => (
					// @ts-ignore
					<SidebarItem
						icon={link.icon}
						key={link.name}
						title={t(link.name)}
						href={link.path}
						amount={link.name === "pinned" ? allPinnedNotes?.length : allNotes?.length}
						expanded={expanded}
					/>
				))}
			</ul>
			<hr className={sidebarStyles.sidebar__separator} />
			<h3>{expanded ? t("groups") : null}</h3>
			<ul className={sidebarStyles.sidebar__grouplist}>
				{allGroups?.map((group: Group) => (
					<GroupItem
						key={group.id}
						id={group.id}
						title={group.title}
						// @ts-ignore
						amount={allNoteAmounts[group.id] ? allNoteAmounts[group.id] : 0}
						expanded={expanded}
					/>
				))}
			</ul>
			<button className={!expanded ? sidebarStyles.sidebar__expand__button__collapsed : sidebarStyles.sidebar__expand__button} type="button" onClick={handleClick}>
				{expanded ? "<" : ">"}
			</button>
		</aside>
	);
};

export default SidebarClient;

"use client"

import Image from "next/image";
import Link from "next/link";
import { mainSidebarLinks } from "../constants";
import sidebarStyles from "../styles/sidebar.module.css";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import NewNoteButton from "./ui/NewNoteButton";
import { useState } from "react";
import initClientTranslations from "../i18n-client";
import type { Note, Group } from "../types";

const SidebarClient = ({ params: { lang },
	data: { allNotes, allPinnedNotes, allGroups, allNoteAmounts
	} }: { params: { lang: string }, data: { allNotes: Note[], allPinnedNotes: Note[], allGroups: Group[], allNoteAmounts: object } }) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const { t } = initClientTranslations(lang, ["common"])

	const handleClick = () => {
		setExpanded(!expanded)
	}

	return (
		<aside className={sidebarStyles.sidebar__container}>
			<Link href="/notes/all" prefetch>
				<Image src="/NextKeep.svg" alt="Next Keep logo" width="250" height="150" priority />
			</Link>
			<NewNoteButton title={t("create-note")} />
			<ul className={sidebarStyles.sidebar__grouplist}>
				{mainSidebarLinks.map((link) => (
					// @ts-ignore
					<SidebarItem icon={link.icon} key={link.name} title={t(link.name)} href={link.path} amount={link.name === "pinned" ? allPinnedNotes?.length : allNotes?.length} />
				))}
			</ul>
			<hr className={sidebarStyles.sidebar__separator} />
			<h3>{t("groups")}</h3>
			<ul className={sidebarStyles.sidebar__grouplist}>
				{allGroups?.map((group: Group) => (
					<GroupItem key={group.id} id={group.id} title={group.title} amount={allNoteAmounts[group.id] ? allNoteAmounts[group.id] : 0} />
				))}
			</ul>
			<button type="button" onClick={handleClick}>{expanded ? ">" : "<"}</button>
		</aside>
	);
};

export default SidebarClient;

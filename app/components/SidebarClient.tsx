"use client"

import Image from "next/image";
import Link from "next/link";
import { mainSidebarLinks } from "../constants";
import sidebarStyles from "../styles/sidebar.module.css";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import NewNoteButton from "./ui/NewNoteButton";
import { useState } from "react";
import useFetchAll from "../utils/hooks/useFetchAll";
import initClientTranslations from "../i18n-client";
import type { Group } from "../types";

const SidebarClient = ({ params: { lang } }: { params: { lang: string } }) => {
	const [expanded, setExpanded] = useState<boolean>(false);
	const { t } = initClientTranslations(lang, ["common"])

	const { allNotes, allPinnedNotes, allGroups, allNoteAmounts } = useFetchAll()

	const handleClick = () => {
		setExpanded(!expanded)
	}

	if (!(allNotes && allPinnedNotes && allGroups && allNoteAmounts)) {
		return null;
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
				{allGroups?.sort((a, b) => a.title.localeCompare(b.title)).map((group: Group) => (
					<GroupItem key={group.id} id={group.id} title={group.title} amount={0} />
				))}
			</ul>
			<button type="button" onClick={() => handleClick()}>{expanded ? ">" : "<"}</button>
		</aside>
	);
};

export default SidebarClient;

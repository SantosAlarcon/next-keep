"use client";

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
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "primereact/button";

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

	const variants = {
		expanded: {
			width: "23rem",
		},
		collapsed: {
			width: "5rem",
		},
	}

	const logoVariants = {
		expanded: {
			width: "100px",
			height: "100px"
		},
		collapsed: {
			width: "50px",
			height: "50px"
		},
	}


	if (!i18nClient) return null;

	return (
		<AnimatePresence initial={false}>
			<motion.aside
				initial={expanded ? "collapsed" : "expanded"}
				animate={expanded ? "expanded" : "collapsed"}
				exit={expanded ? "collapsed" : "expanded"}
				variants={variants}
				className={sidebarStyles.sidebar__container}
			>
				<section className={sidebarStyles.sidebar__top}>
					<Link href="/notes/all" prefetch>
						<motion.img
							className={sidebarStyles.sidebar__logo}
							src="/NextKeep.svg"
							alt="Next Keep logo"
							initial={expanded ? "collapsed" : "expanded"}
							animate={expanded ? "expanded" : "collapsed"}
							exit={expanded ? "collapsed" : "expanded"}
							variants={logoVariants}
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
					{expanded ? <h3>{t("groups")}</h3> : null}
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

				</section>

				<section className={sidebarStyles.sidebar__bottom}>
					<Button severity="secondary" label={expanded ? "<" : ">"} className={!expanded ? sidebarStyles.sidebar__expand__button__collapsed : sidebarStyles.sidebar__expand__button} type="button" onClick={handleClick} />
				</section>
			</motion.aside>
		</AnimatePresence>
	);
};

export default SidebarClient;

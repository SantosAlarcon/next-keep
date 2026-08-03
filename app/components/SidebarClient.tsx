"use client";

import { Sidebar as SidebarIcon } from "@primeicons/react/sidebar";
import { useIsMobile } from "@primereact/hooks/use-is-mobile";
import { Button } from "@primereact/ui/button";
import { Sidebar } from "@primereact/ui/sidebar";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useEffect, useState } from "react";
import CreateGroupButton from "@/app/components/ui/buttons/CreateGroupButton";
import NewNoteButton from "@/app/components/ui/buttons/NewNoteButton";
import { logoVariants, mainSidebarLinks, variants } from "../constants";
import { dataStore } from "../store/dataStore";
import sidebarStyles from "../styles/sidebar.module.css";
import type { Group } from "../types";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import User from "./ui/User";

const SidebarClient = () => {
	const { t } = useT("common");

	// @ts-ignore
	const { allNotes, allGroups, allPinnedNotes } = dataStore.getState();
	const router = useRouter();

	const [mounted, setMounted] = useState<boolean>(false);
	const [expanded, setExpanded] = useState<boolean>(() => {
		// The default sidebar behaviour is opened. First checks if the sidebar_expanded
		// is in the Local Storage. If not, it creates the key.

		if (typeof window !== "undefined") {
			if (!window.localStorage.getItem("sidebar_expanded")) {
				window.localStorage.setItem("sidebar_expanded", "true");
				return true;
			}

			if (window.localStorage.getItem("sidebar_expanded") === "true") {
				return true;
			}
		}

		return false;
	});

	const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

	useEffect(() => {
		if (expanded) {
			window.localStorage.setItem("sidebar_expanded", "true");
		} else {
			window.localStorage.setItem("sidebar_expanded", "false");
		}
	}, [expanded]);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isMobile = useIsMobile(1024);

	if (!mounted) return null;

	return (
		<AnimatePresence initial={false}>
			<Sidebar.Layout>
				{isMobile && <Sidebar.Backdrop />}
				<Sidebar.Root overlay={true} variant="sidebar" collapsible="icon">
					<motion.aside
						initial={expanded ? "collapsed" : "expanded"}
						animate={expanded ? "expanded" : "collapsed"}
						exit={expanded ? "collapsed" : "expanded"}
						variants={variants}
						className={sidebarStyles.sidebar__container}
					>
						<Sidebar.Panel>
							<Sidebar.Header>
								<section className={sidebarStyles.sidebar__top}>
									<Link href="/notes/all" prefetch aria-label="Next Keep logo">
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
								</section>
							</Sidebar.Header>
							<Sidebar.Content>
								<NewNoteButton expanded={expanded} />
								<ul className={sidebarStyles.sidebar__grouplist}>
									{mainSidebarLinks.map((link) => (
										<SidebarItem
											icon={link.icon}
											key={link.name}
											title={t(link.name)}
											href={link.path}
											amount={
												link.name === "pinned"
													? allPinnedNotes?.length
													: allNotes?.length
											}
											expanded={expanded}
										/>
									))}
								</ul>
								<Sidebar.Spacer />
								<div className={sidebarStyles.sidebar__groups__header}>
									{expanded ? (
										<Sidebar.GroupLabel>{t("groups")}</Sidebar.GroupLabel>
									) : null}
									<CreateGroupButton title={t("group.create-group")} />
								</div>
								<ul className={sidebarStyles.sidebar__grouplist}>
									{allGroups?.map((group: Group) => (
										<GroupItem
											key={group.$id}
											selectedGroup={group}
											title={group.title}
											//amount={allNoteAmounts[group.$id] ? allNoteAmounts[group.$id] : 0}
											amount={0}
											expanded={expanded}
										/>
									))}
								</ul>
							</Sidebar.Content>

							<Sidebar.Footer>
								{/* <section className={sidebarStyles.sidebar__bottom}> */}
								<User />
								{/* <CustomTooltip */}
								{/* 	align="center" */}
								{/* 	side="top" */}
								{/* 	tooltipText={expanded ? t("collapse") : t("expand")} */}
								{/* 	onClick={handleClick} */}
								{/* 	severity="secondary" */}
								{/* > */}
								{/* 	{expanded ? ( */}
								{/* 		<CollapseIcon width="20px" height="20px" /> */}
								{/* 	) : ( */}
								{/* 		<ExpandIcon width="20px" height="20px" /> */}
								{/* 	)} */}
								{/* </CustomTooltip> */}
								{/* </section> */}
							</Sidebar.Footer>
							<Sidebar.Main>
								<Sidebar.Trigger
									as={Button}
									severity="secondary"
									size="large"
									iconOnly
								>
									<SidebarIcon />
								</Sidebar.Trigger>
								<Sidebar.Rail />
							</Sidebar.Main>
						</Sidebar.Panel>
					</motion.aside>
				</Sidebar.Root>
			</Sidebar.Layout>
		</AnimatePresence>
	);
};

export default SidebarClient;

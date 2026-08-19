"use client";

import { Sidebar as SidebarIcon } from "@primeicons/react/sidebar";
import { useIsMobile } from "@primereact/hooks/use-is-mobile";
import { Button } from "@primereact/ui/button";
import { Sidebar } from "@primereact/ui/sidebar";
import Link from "next/link";
import { useT } from "next-i18next/client";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import CreateGroupButton from "@/app/components/ui/buttons/CreateGroupButton";
import NewNoteButton from "@/app/components/ui/buttons/NewNoteButton";
import { mainSidebarLinks } from "../constants";
import { dataStore } from "../store/dataStore";
import sidebarStyles from "../styles/sidebar.module.css";
import type { Group } from "../types";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import User from "./ui/User";

const SidebarClient = ({
	children
}: {
	children: ReactNode
}) => {
	const { t } = useT("common");

	const allNotes = dataStore((state: any) => state.allNotes);
	const allGroups = dataStore((state: any) => state.allGroups);
	const allPinnedNotes = dataStore((state: any) => state.allPinnedNotes);

	const isMobile = useIsMobile(768);

	const [mounted, setMounted] = useState<boolean>(false);
	const [expanded, setExpanded] = useState<boolean>(() => {
		if (typeof window !== "undefined") {
			if (!window.localStorage.getItem("sidebar_expanded") && !isMobile) {
				window.localStorage.setItem("sidebar_expanded", "true");
				return true;
			}

			if (window.localStorage.getItem("sidebar_expanded") === "true") {
				return true;
			}
		}

		return false;
	});

	useEffect(() => {
		if (expanded && !isMobile) {
			window.localStorage.setItem("sidebar_expanded", "true");
		} else {
			window.localStorage.setItem("sidebar_expanded", "false");
		}
	}, [expanded, isMobile]);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleExpanded = useCallback(
		() => setExpanded((prev) => !prev),
		[],
	);

	if (!mounted) return null;

	return (
		<>
			<Sidebar.Layout>
				{isMobile && <Sidebar.Backdrop className="sidebar__backdrop" />}
				<Sidebar.Root
					overlay={isMobile}
					variant="sidebar"
					collapsible="icon"
					open={expanded}
				>
					<Sidebar.Spacer />
					<Sidebar.Aside>
						<Sidebar.Panel>
							<Sidebar.Header>
								<section className={sidebarStyles.sidebar__top}>
									<Link href="/notes/all" prefetch aria-label="Next Keep logo">
										<img
											className={sidebarStyles.sidebar__logo}
											src="/NextKeep.svg"
											alt="Next Keep logo"
											style={{
												width: expanded ? "100px" : "35px",
												height: expanded ? "100px" : "35px",
												transition: "width 0.3s ease, height 0.3s ease",
											}}
										/>
									</Link>
								</section>
							</Sidebar.Header>

							<Sidebar.Content>
								<NewNoteButton expanded={expanded} />
								<Sidebar.Spacer />
								<nav aria-label={t("main-navigation")}>
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
								</nav>
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
											amount={0}
											expanded={expanded}
										/>
									))}
								</ul>
							</Sidebar.Content>

							<Sidebar.Footer
								style={{
									flexDirection: expanded ? "row" : "column",
								}}
							>
								<User />
								<Sidebar.Trigger
									as={Button}
									severity="secondary"
									iconOnly
									aria-label={expanded ? t("collapse-sidebar") : t("expand-sidebar")}
									pt-root-onClick={toggleExpanded}
								>
									<SidebarIcon />
								</Sidebar.Trigger>
							</Sidebar.Footer>
							<Sidebar.Rail />
						</Sidebar.Panel>
					</Sidebar.Aside>
				</Sidebar.Root>

				<Sidebar.Main>
					{
						children
					}
				</Sidebar.Main>
			</Sidebar.Layout>
		</>
	);
};

export default SidebarClient;

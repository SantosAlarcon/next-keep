import groups from "@/data/groups.json";
import sidebarStyles from "../styles/sidebar.module.css";
import Image from "next/image";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import { getNotesByGroup } from "../utils/getNotesByGroup";
import Link from "next/link";
import initTranslations from "../i18n";
import { getAllNotes } from "../utils/getAllNotes";
import { getAllPinnedNotes } from "../utils/getAllPinnedNotes";
import { mainSidebarLinks } from "../constants";
import {headers} from "next/headers"

type Group = {
	id: string;
	name: string;
}

const Sidebar = async ({ params: { lang } }: { params: { lang: string } }) => {
	const { t } = await initTranslations(lang, ["common"])

	return (
		<aside className={sidebarStyles.sidebar__container}>
			<Link href="/notes/all" prefetch>
				<Image src="/NextKeep.svg" alt="Next Keep logo" width="250" height="150" priority />
			</Link>
			<ul className={sidebarStyles.sidebar__grouplist}>
			    {mainSidebarLinks.map((link) => (
			        <SidebarItem icon={link.icon} key={link.name} title={t(link.name)} href={link.path} amount={link.name === "pinned" ? getAllPinnedNotes().length : getAllNotes().length} />
			    ))}
			</ul>
			<hr className={sidebarStyles.sidebar__separator} />
			<h3>{t("groups")}</h3>
			<ul className={sidebarStyles.sidebar__grouplist}>
				{groups.map((group: Group) => (
					<GroupItem key={group.id} id={group.id} title={group.name} amount={getNotesByGroup(group.id).length} />
				))}
			</ul>
		</aside>
	);
};

export default Sidebar;

//import groups from "@/data/groups.json";
import Image from "next/image";
import Link from "next/link";
import { mainSidebarLinks } from "../constants";
import initTranslations from "../i18n";
import sidebarStyles from "../styles/sidebar.module.css";
import { getAllNotes } from "../utils/notes/getAllNotes";
import { getAllPinnedNotes } from "../utils/notes/getAllPinnedNotes";
import { getNotesByGroup } from "../utils/notes/getNotesByGroup";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import NewNoteButton from "./ui/NewNoteButton";
import { getAllGroups } from "../utils/database/groups/getAllGroups";

type Group = {
	id: string;
	title: string;
}

const Sidebar = async ({ params: { lang } }: { params: { lang: string } }) => {
	const { t } = await initTranslations(lang, ["common"])
    const groups = await getAllGroups();

    console.log(groups);

	return (
		<aside className={sidebarStyles.sidebar__container}>
			<Link href="/notes/all" prefetch>
				<Image src="/NextKeep.svg" alt="Next Keep logo" width="250" height="150" priority />
			</Link>
			<NewNoteButton title={t("create-note")} />
			<ul className={sidebarStyles.sidebar__grouplist}>
				{mainSidebarLinks.map((link) => (
					<SidebarItem icon={link.icon} key={link.name} title={t(link.name)} href={link.path} amount={link.name === "pinned" ? getAllPinnedNotes().length : getAllNotes().length} />
				))}
			</ul>
			<hr className={sidebarStyles.sidebar__separator} />
			<h3>{t("groups")}</h3>
			<ul className={sidebarStyles.sidebar__grouplist}>
				{groups?.sort((a, b) => a.title.localeCompare(b.title)).map((group: Group) => (
					<GroupItem key={group.id} id={group.id} title={group.title} amount={getNotesByGroup(group.id).length} />
				))}
			</ul>
		</aside>
	);
};

export default Sidebar;

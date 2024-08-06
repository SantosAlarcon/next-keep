import Image from "next/image";
import Link from "next/link";
import { mainSidebarLinks } from "../constants";
import initTranslations from "../i18n";
import sidebarStyles from "../styles/sidebar.module.css";
import { getAllNotes } from "../utils/database/notes/getAllNotes";
import { getAllPinnedNotes } from "../utils/database/notes/getAllPinnedNotes";
import { getAllGroups } from "../utils/database/groups/getAllGroups";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import NewNoteButton from "./ui/NewNoteButton";
import { sidebarStore } from "../store/sidebarStore";
import SidebarExpandButton from "./SidebarExpandButton";

type Group = {
	id: string;
	title: string;
}

const Sidebar = async ({ params: { lang } }: { params: { lang: string } }) => {
	const { t } = await initTranslations(lang, ["common"])
    const {expanded} = sidebarStore.getState()

	const [notes, pinnedNotes, groups] = await Promise.all([
		getAllNotes(),
		getAllPinnedNotes(),
		getAllGroups(),
	]);

	return (
		<aside className={sidebarStyles.sidebar__container}>
			<Link href="/notes/all" prefetch>
				<Image src="/NextKeep.svg" alt="Next Keep logo" width="250" height="150" priority />
			</Link>
			<NewNoteButton title={t("create-note")} />
			<ul className={sidebarStyles.sidebar__grouplist}>
				{mainSidebarLinks.map((link) => (
					// @ts-ignore
					<SidebarItem icon={link.icon} key={link.name} title={t(link.name)} href={link.path} amount={link.name === "pinned" ? pinnedNotes?.length : notes?.length} />
				))}
			</ul>
			<hr className={sidebarStyles.sidebar__separator} />
			<h3>{t("groups")}</h3>
			<ul className={sidebarStyles.sidebar__grouplist}>
				{groups?.sort((a, b) => a.title.localeCompare(b.title)).map((group: Group) => (
					<GroupItem key={group.id} id={group.id} title={group.title} />
				))}
			</ul>
            <SidebarExpandButton />
            {expanded ? "Expanded" : "Not expanded"}
		</aside>
	);
};

export default Sidebar;

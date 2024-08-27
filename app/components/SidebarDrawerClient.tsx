"use client";

import Link from "next/link";
import { SyntheticEvent, useRef, useState } from "react";
import { mainSidebarLinks } from "../constants";
import i18nClient from "../i18n-client";
import { dataStore } from "../store/dataStore";
import sidebarStyles from "@/styles/sidebar.module.css";
import DrawerStyles from "@/styles/MobileHeader.module.css";
import type { Group } from "../types";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import NewNoteButton from "@/app/components/ui/buttons/NewNoteButton";
import CreateGroupButton from "@/app/components/ui/buttons/CreateGroupButton";
import { ContextMenu } from "primereact/contextmenu";
import { deleteGroupById } from "../utils/groups/deleteGroupById";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateGroups } from "../utils/updateData";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import RenameGroupDialog from "./ui/dialogs/RenameGroupDialog";
import { Sidebar } from "primereact/sidebar";
import Image from "next/image";
import { Button } from "primereact/button";

const SidebarDrawerClient = ({ params: { lang }, visible, onHide }: { params: { lang: string }; visible: boolean; onHide: () => void }) => {
	const t = i18nClient.getFixedT(lang, "common");
	// @ts-ignore
	const { allNotes, allGroups, allNoteAmounts, allPinnedNotes } = dataStore.getState();
	const cmRef = useRef(null);
	const router = useRouter();

	const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
	const [renameGroupVisibleModal, setRenameGroupVisibleModal] = useState<boolean>(false);

	const groupContextMenu = [
		{
			label: t("group.rename-group"),
			icon: "pi pi-fw pi-pencil",
			command: () => setRenameGroupVisibleModal(true),
		},
		{
			label: t("group.delete-group"),
			icon: "pi pi-fw pi-trash",
			command: () => {
				confirmDialog({
					header: t("group.group-delete-confirm-header"),
					message: t("group.group-delete-confirm-message"),
					icon: "pi pi-info-circle",
					acceptLabel: t("yes"),
					rejectLabel: t("no"),
					accept: () => {
						// @ts-ignore
						toast.promise(
							deleteGroupById(selectedGroup?.id).then(() => {
								updateGroups();
								setTimeout(() => {
									router.refresh();
								}, 200);
							}),
							{
								loading: t("pending-operation"),
								success: () => {
									return t("group.group-delete-success", { name: selectedGroup?.title });
								},
								error: () => t("group.group-delete-error"),
							},
						);
					},
					reject: () => {},
				});
			},
		},
	];

	const handleContext = (event: PointerEvent, group: Group) => {
		if (cmRef.current) {
			setSelectedGroup(group);
			// @ts-ignore
			cmRef.current.show(event);
		}
	};

	return (
		<Sidebar
			blockScroll={true}
			visible={visible}
			onHide={onHide}
			content={({ closeIconRef, hide }) => (
				<section className={DrawerStyles.drawer__container}>
					<Link href="/notes/all" prefetch>
						<Image className={sidebarStyles.sidebar__logo} width="128" height="128" src="/NextKeep.svg" alt="Next Keep logo" />
					</Link>
					<NewNoteButton title={t("create-note")} expanded={true} onClick={(e) => hide(e)} />
					<ul className={sidebarStyles.sidebar__grouplist}>
						{mainSidebarLinks.map((link) => (
							// @ts-ignore
							<SidebarItem
								icon={link.icon}
								expanded={true}
								key={link.name}
								title={t(link.name)}
								href={link.path}
								amount={link.name === "pinned" ? allPinnedNotes?.length : allNotes?.length}
							/>
						))}
					</ul>
					<hr className={sidebarStyles.sidebar__separator} />
					<div className={sidebarStyles.sidebar__groups__header}>
						<h3>{t("groups")}</h3>
						<CreateGroupButton lang={lang} title={t("group.create-group")} />
					</div>
					<ul className={sidebarStyles.sidebar__grouplist}>
						{allGroups?.map((group: Group) => (
							<GroupItem
								key={group.id}
								id={group.id}
								title={group.title}
								expanded={true}
								// @ts-ignore
								amount={allNoteAmounts[group.id] ? allNoteAmounts[group.id] : 0}
								// @ts-ignore
								onContextMenu={(event) => handleContext(event, group)}
							/>
						))}
					</ul>
					<ContextMenu ref={cmRef} model={groupContextMenu} />
					<ConfirmDialog resizable={false} draggable={false} />
					{/* @ts-ignore */}
					<RenameGroupDialog
						lang={lang}
						visible={renameGroupVisibleModal}
						onHide={() => setRenameGroupVisibleModal(false)}
						group={selectedGroup}
					/>
                    <Button onClick={(e: SyntheticEvent) => hide(e)} />
				</section>
			)}
		/>
	);
};

export default SidebarDrawerClient;

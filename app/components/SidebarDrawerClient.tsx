"use client";

import { Sidebar } from "@primereact/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import CreateGroupButton from "@/app/components/ui/buttons/CreateGroupButton";
import NewNoteButton from "@/app/components/ui/buttons/NewNoteButton";
import DrawerStyles from "@/styles/MobileHeader.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";
import { mainSidebarLinks } from "../constants";
import { dataStore } from "../store/dataStore";
import type { Group } from "../types";
import { deleteGroupById } from "../utils/groups/deleteGroupById";
import { updateGroups } from "../utils/updateData";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import CustomContextMenu from "./ui/CustomContextMenu";
import RenameGroupDialog from "./ui/dialogs/RenameGroupDialog";
import User from "./ui/User";

const SidebarDrawerClient = ({
	params: { lang },
	visible,
	onHide,
}: {
	params: { lang: string };
	visible: boolean;
	onHide: () => void;
}) => {
	const {
		t
	} = useT("common")
	// @ts-ignore
	const { allNotes, allGroups, allPinnedNotes } = dataStore.getState();
	const cmRef = useRef(null);
	const router = useRouter();

	const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
	const [renameGroupVisibleModal, setRenameGroupVisibleModal] =
		useState<boolean>(false);

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
				toast.promise(
					// @ts-ignore
					deleteGroupById(selectedGroup?.$id).then(() => {
						updateGroups();
						setTimeout(() => {
							router.refresh();
						}, 200);
					}),
					{
						loading: t("pending-operation"),
						success: () => {
							return t("group.group-delete-success", {
								name: selectedGroup?.title,
							});
						},
						error: () => t("group.group-delete-error"),
					},
				);
			},
			reject: () => { },
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
		<Sidebar.Layout>
			<Sidebar.Root id="main" collapsible="icon" defaultOpen={visible}>
				<Sidebar.Aside className={DrawerStyles.drawer__container}>
					<Sidebar.Panel>
						<div className={DrawerStyles.drawer__top}>
							<Link href="/notes/all" prefetch onClick={onHide}>
								<Image
									className={sidebarStyles.sidebar__logo}
									width="128"
									height="128"
									src="/NextKeep.svg"
									alt="Next Keep logo"
								/>
							</Link>
							{/* @ts-ignore */}
							<span onClick={onHide}>
								<NewNoteButton expanded={true} />
							</span>

							<ul className={sidebarStyles.sidebar__grouplist} onClick={onHide}>
								{mainSidebarLinks.map((link) => (
									// @ts-ignore
									<SidebarItem
										icon={link.icon}
										expanded={true}
										key={link.name}
										title={t(link.name)}
										href={link.path}
										amount={
											link.name === "pinned"
												? allPinnedNotes?.length
												: allNotes?.length
										}
									/>
								))}
							</ul>
							<Sidebar.Spacer className={sidebarStyles.sidebar__separator} />
							<Sidebar.Content
								className={sidebarStyles.sidebar__groups__header}
							>
								<Sidebar.GroupLabel>{t("groups")}</Sidebar.GroupLabel>
								<Sidebar.GroupContent>
									<Sidebar.Menu></Sidebar.Menu>
								</Sidebar.GroupContent>
								<CreateGroupButton
									lang={lang}
									title={t("group.create-group")}
								/>
							</Sidebar.Content>
							<ul className={sidebarStyles.sidebar__grouplist} onClick={onHide}>
								{allGroups?.map((group: Group) => (
									<GroupItem
										key={group.$id}
										id={group.$id}
										title={group.title}
										expanded={true}
										//amount={allNoteAmounts[group.$id] ? allNoteAmounts[group.$id] : 0}
										amount={0}
										// @ts-ignore
										onContextMenu={(event) => handleContext(event, group)}
									/>
								))}
							</ul>
							<CustomContextMenu ref={cmRef} model={groupContextMenu} />
							<RenameGroupDialog
								lang={lang}
								visible={renameGroupVisibleModal}
								onHide={() => setRenameGroupVisibleModal(false)}
								// @ts-ignore
								group={selectedGroup}
							/>
						</div>
						<div className={DrawerStyles.drawer__bottom}>
							<User />
						</div>
					</Sidebar.Panel>
				</Sidebar.Aside>
			</Sidebar.Root>
		</Sidebar.Layout>
	);
};

export default SidebarDrawerClient;

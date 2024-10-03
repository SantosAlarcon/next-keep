"use client";

import CreateGroupButton from "@/app/components/ui/buttons/CreateGroupButton";
import NewNoteButton from "@/app/components/ui/buttons/NewNoteButton";
import DrawerStyles from "@/styles/MobileHeader.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { confirmDialog } from "primereact/confirmdialog";
import { ContextMenu } from "primereact/contextmenu";
import { Sidebar } from "primereact/sidebar";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { mainSidebarLinks } from "../constants";
import i18nClient from "../i18n-client";
import { dataStore } from "../store/dataStore";
import type { Group } from "../types";
import { deleteGroupById } from "../utils/groups/deleteGroupById";
import { updateGroups } from "../utils/updateData";
import GroupItem from "./GroupItem";
import SidebarItem from "./SidebarItem";
import RenameGroupDialog from "./ui/dialogs/RenameGroupDialog";

const SidebarDrawerClient = ({ params: { lang }, visible, onHide }: { params: { lang: string }; visible: boolean; onHide: () => void }) => {
    const t = i18nClient.getFixedT(lang, "common");
    // @ts-ignore
    const { allNotes, allGroups, allPinnedNotes } = dataStore.getState();
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
                    resizable: false,
                    draggable: false,
                    header: t("group.group-delete-confirm-header"),
                    message: (
                        <p>
                            {t("group.group-delete-confirm-message-1")}
                            <br />
                            {t("group.group-delete-confirm-message-2")}
                        </p>
                    ),
                    icon: "pi pi-info-circle",
                    acceptLabel: t("yes"),
                    rejectLabel: t("no"),
                    accept: () => {
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
                                    return t("group.group-delete-success", { name: selectedGroup?.title });
                                },
                                error: () => t("group.group-delete-error"),
                            },
                        );
                    },
                    reject: () => { },
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
        <Sidebar blockScroll={true} visible={visible} onHide={onHide}>
            <aside className={DrawerStyles.drawer__container}>
                <Link href="/notes/all" prefetch onClick={onHide}>
                    <Image className={sidebarStyles.sidebar__logo} width="128" height="128" src="/NextKeep.svg" alt="Next Keep logo" />
                </Link>
                {/* @ts-ignore */}
                <span onClick={onHide}>
                    <NewNoteButton title={t("create-note")} expanded={true} />
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
                            amount={link.name === "pinned" ? allPinnedNotes?.length : allNotes?.length}
                        />
                    ))}
                </ul>
                <hr className={sidebarStyles.sidebar__separator} />
                <div className={sidebarStyles.sidebar__groups__header}>
                    <h3>{t("groups")}</h3>
                    <CreateGroupButton lang={lang} title={t("group.create-group")} />
                </div>
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
                <ContextMenu ref={cmRef} model={groupContextMenu} />
                <RenameGroupDialog
                    lang={lang}
                    visible={renameGroupVisibleModal}
                    onHide={() => setRenameGroupVisibleModal(false)}
                    // @ts-ignore
                    group={selectedGroup}
                />
            </aside>
        </Sidebar>
    );
};

export default SidebarDrawerClient;

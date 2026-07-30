"use client";

import { Button } from "@primereact/ui/button";
import { Sidebar } from "@primereact/ui/sidebar";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import CreateGroupButton from "@/app/components/ui/buttons/CreateGroupButton";
import NewNoteButton from "@/app/components/ui/buttons/NewNoteButton";
import type { ContextMenuItem } from "@/app/types";
import { logoVariants, mainSidebarLinks, variants } from "../constants";
import { dataStore } from "../store/dataStore";
import sidebarStyles from "../styles/sidebar.module.css";
import type { Group } from "../types";
import { deleteGroupById } from "../utils/groups/deleteGroupById";
import { changeNoteGroupsToNull } from "../utils/notes/changeNoteGroupsToNull";
import { updateGroups } from "../utils/updateData";
import GroupItem from "./GroupItem";
import { CollapseIcon } from "./icons/CollapseIcon";
import { ExpandIcon } from "./icons/ExpandIcon";
import SidebarItem from "./SidebarItem";
import CustomContextMenu from "./ui/CustomContextMenu";
import CustomTooltip from "./ui/CustomTooltip";
import ConfirmDialog from "./ui/dialogs/ConfirmDialog";
import RenameGroupDialog from "./ui/dialogs/RenameGroupDialog";
import User from "./ui/User";

const SidebarClient = ({ lang }: { lang: string }) => {
    const { t } = useT("common");

    // @ts-ignore
    const { allNotes, allGroups, allPinnedNotes } = dataStore.getState();
    const cmRef = useRef(null);
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
    const [renameGroupVisibleModal, setRenameGroupVisibleModal] =
        useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (expanded) {
            window.localStorage.setItem("sidebar_expanded", "true");
        } else {
            window.localStorage.setItem("sidebar_expanded", "false");
        }
    }, [expanded]);

    const groupContextMenu: ContextMenuItem[] = [
        {
            label: t("group.rename-group"),
            icon: "pi pi-fw pi-pencil",
            command: () => setRenameGroupVisibleModal(true),
        },
        {
            label: t("group.delete-group"),
            icon: "pi pi-fw pi-trash",
            command: () => {
                const groupId = selectedGroup?.$id;
                toast.promise(
                    // @ts-ignore
                    deleteGroupById(selectedGroup?.$id).then(() => {
                        // @ts-ignore
                        changeNoteGroupsToNull(groupId);
                        updateGroups();
                        setTimeout(() => {
                            router.refresh();
                        }, 100);
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
        },
    ];

    const handleContext = (event: PointerEvent, group: Group) => {
        if (cmRef.current) {
            setSelectedGroup(group);
            // @ts-ignore
            cmRef.current.show(event);
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence initial={false}>
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
                            <hr className={sidebarStyles.sidebar__separator} />
                            <div className={sidebarStyles.sidebar__groups__header}>
                                {expanded ? <h3>{t("groups")}</h3> : null}
                                <CreateGroupButton
                                    lang={lang}
                                    title={t("group.create-group")}
                                />
                            </div>
                            <ul className={sidebarStyles.sidebar__grouplist}>
                                {allGroups?.map((group: Group) => (
                                    <GroupItem
                                        key={group.$id}
                                        id={group.$id}
                                        title={group.title}
                                        // @ts-ignore
                                        //amount={allNoteAmounts[group.$id] ? allNoteAmounts[group.$id] : 0}
                                        amount={0}
                                        expanded={expanded}
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
                            <ConfirmDialog
                                open={deleteModal}
                                header={t("group.group-delete-confirm-header")}
                                value={t("delete")}
                                severity="danger"
                                message={
                                    <>
                                        {t("group.group-delete-confirm-message-1")}
                                        <br />
                                        {t("group.group-delete-confirm-message-2")}
                                    </>
                                }
                                acceptLabel={t("yes")}
                                cancelLabel={t("no")}
                                accept={() => {
                                    const groupId = selectedGroup?.$id;
                                    toast.promise(
                                        // @ts-ignore
                                        deleteGroupById(selectedGroup?.$id).then(() => {
                                            // @ts-ignore
                                            changeNoteGroupsToNull(groupId);
                                            updateGroups();
                                            setTimeout(() => {
                                                router.refresh();
                                            }, 100);
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
                                }}
                            />
                        </Sidebar.Content>

                        <Sidebar.Footer>
                            <section className={sidebarStyles.sidebar__bottom}>
                                <User />
                                <CustomTooltip
                                    align="center"
                                    side="top"
                                    tooltipText={expanded ? t("collapse") : t("expand")}
                                >
                                    <Button
                                        aria-label={expanded ? t("collapse") : t("expand")}
                                        className={
                                            expanded
                                                ? sidebarStyles.sidebar__expand__button
                                                : sidebarStyles.sidebar__expand__button__collapsed
                                        }
                                        type="button"
                                        onClick={handleClick}
                                    >
                                        {expanded ? (
                                            <CollapseIcon width="20px" height="20px" />
                                        ) : (
                                            <ExpandIcon width="20px" height="20px" />
                                        )}
                                    </Button>
                                </CustomTooltip>
                            </section>
                        </Sidebar.Footer>
                    </Sidebar.Panel>
                </motion.aside>
            </Sidebar.Root>
        </AnimatePresence>
    );
};

export default SidebarClient;

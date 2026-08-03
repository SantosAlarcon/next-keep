import { FileEdit } from "@primeicons/react/file-edit";
import { Trash } from "@primeicons/react/trash";
import { Sidebar } from "@primereact/ui/sidebar";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import GroupItemStyles from "@/app/styles/GroupItem.module.css";
import type { ContextMenuItem, Group } from "../types";
import { deleteGroupById } from "../utils/groups/deleteGroupById";
import { updateGroups } from "../utils/updateData";
import CustomSidebarMenu from "./ui/CustomSidebarMenu";
import ConfirmDialog from "./ui/dialogs/ConfirmDialog";
import RenameGroupDialog from "./ui/dialogs/RenameGroupDialog";

const GroupItem = ({
	selectedGroup,
	title,
	amount,
	expanded,
}: {
	selectedGroup: Group;
	title: string;
	amount: number;
	expanded: boolean;
}) => {
	const itemRef = useRef<unknown>(null);
	const { t } = useT("common");
	const router = useRouter();
	const { group } = useParams();

	const [renameGroupVisibleModal, setRenameGroupVisibleModal] =
		useState<boolean>(false);
	const [deleteGroupModal, setDeleteGroupModal] = useState<boolean>(false);

	const groupContextMenu: ContextMenuItem[] = [
		{
			label: t("group.rename-group"),
			icon: FileEdit,
			command: () => setRenameGroupVisibleModal(true),
		},
		{
			label: t("group.delete-group"),
			icon: Trash,
			command: () => setDeleteGroupModal(true),
		},
	];

	return (
		<>
			<Sidebar.MenuItem key={selectedGroup.$id} ref={itemRef}>
				<Sidebar.MenuButton
					pt-root-onClick={() => redirect(`/groups/${selectedGroup.$id}`)}
					isActive={group === selectedGroup.$id}
				>
					<Image
						className={GroupItemStyles.group__item__icon}
						src="/group.svg"
						width="20"
						height="20"
						alt="Group icon"
					/>
					<span className={GroupItemStyles.group__item__title}>{title}</span>
				</Sidebar.MenuButton>
				<CustomSidebarMenu model={groupContextMenu} />
			</Sidebar.MenuItem>
			<RenameGroupDialog
				visible={renameGroupVisibleModal}
				onHide={() => setRenameGroupVisibleModal(false)}
				group={selectedGroup}
			/>
			<ConfirmDialog
				open={deleteGroupModal}
				header={t("group.group-delete-confirm-header")}
				message={
					<p>
						{t("group.group-delete-confirm-message-1")}
						<br />
						{t("group.group-delete-confirm-message-2")}
					</p>
				}
				severity={"danger"}
				acceptLabel={t("yes")}
				cancelLabel={t("no")}
				accept={() => {
					toast.promise(
						// @ts-ignore
						deleteGroupById(selectedGroup.$id).then(() => {
							// @ts-ignore
							changeNoteGroupsToNull(groupId);
							updateGroups();
							setTimeout(() => {
								router.refresh();
							}, 50);
						}),
						{
							loading: t("pending-operation"),
							success: () => {
								return t("group.group-delete-success", {
									name: selectedGroup?.title,
								});
							},
							error: () => t("group.group-delete-error"),
                            finally: () => setDeleteGroupModal(false)
						},
					);
					setDeleteGroupModal(false);
				}}
				onHide={() => setDeleteGroupModal(false)}
			/>
		</>
	);
};

export default GroupItem;

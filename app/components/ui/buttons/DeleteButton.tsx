"use client";

import { Trash } from "@primeicons/react/trash";
import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { toast } from "sonner";
import { deleteNote } from "@/app/utils/notes/deleteNote";
import { updateNotes } from "@/app/utils/updateData";
import CustomTooltip from "../CustomTooltip";
import ConfirmDialog from "../dialogs/ConfirmDialog";

function DeleteButton({ label, noteId }: { label: string; noteId: string }) {
	const router = useRouter();
	const { t } = useT("common");
	const [deleteModal, setDeleteModal] = useState<boolean>(false);
	return (
		<>
			<CustomTooltip side="bottom" align="center" tooltipText={t("delete")}>
				<Button
					onClick={() => setDeleteModal(true)}
					aria-label={label}
					severity="danger"
				>
					<Trash />
				</Button>
			</CustomTooltip>
			<ConfirmDialog
				open={deleteModal}
				value={""}
				header={t("note-delete-confirm-header")}
				message={
					<p>
						{t("note-delete-confirm-1")}
						<br />
						{t("note-delete-confirm-2")}
					</p>
				}
				severity={"danger"}
				acceptLabel={t("yes")}
				cancelLabel={t("no")}
				accept={() => {
					toast.promise(
						deleteNote(noteId).then(() => {
							router.back();
							updateNotes();

							setTimeout(() => {
								router.refresh();
							}, 50);
						}),
						{
							loading: t("pending-operation"),
							success: () => t("note-delete-success"),
							error: () => t("note-delete-error"),
						},
					);
				}}
			/>
		</>
	);
}

export default DeleteButton;

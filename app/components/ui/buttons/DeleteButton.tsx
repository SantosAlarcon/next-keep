"use client";

import DeleteIcon from "@/app/components/icons/DeleteIcon";
import { deleteNote } from "@/app/utils/notes/deleteNote";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNotes } from "@/app/utils/updateData";
import { localeStore } from "@/app/store/localeStore";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function DeleteButton({
	label,
	noteId,
}: { label: string; noteId: string; }) {
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();
	// @ts-ignore
	const { locale } = localeStore.getState();
	const { t } = useTranslation("common", { lng: locale });

	const handleClick = () => {
		confirmDialog({
			draggable: false,
			acceptLabel: t("yes"),
			rejectLabel: t("no"),
			message: (
				<p>
					{t("note-delete-confirm-1")}<br />
					{t("note-delete-confirm-2")}
				</p>
			),
			header: t("note-delete-confirm-header"),
			icon: "pi pi-exclamation-triangle",
			breakpoints: { "640px": "85vw" },
			blockScroll: true,
			accept: () => {
				setPending(true);
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
						finally: () => setPending(false),
					},
				);
			},
			reject: () => { },
		});
	};
	return (
		<Button
			icon={pending ? <span className="pi pi-spin pi-spinner" /> : <DeleteIcon width="20px" height="20px" />}
			onClick={handleClick}
			type="button"
			tooltip={label}
			tooltipOptions={{ position: "bottom" }}
		/>
	);
}

export default DeleteButton;

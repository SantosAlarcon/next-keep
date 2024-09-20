"use client";

import DeleteIcon from "@/app/components/icons/DeleteIcon";
import { deleteNote } from "@/app/utils/notes/deleteNote";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useState } from "react";
import BarLoader from "@/app/components/ui/BarLoader";
import { useRouter } from "next/navigation";
import { updateNotes } from "@/app/utils/updateData";
import { localeStore } from "@/app/store/localeStore";
import i18nClient from "@/app/i18n-client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function DeleteButton({
	label,
	noteId,
	localeStrings: { yes, no, confirmMessage, confirmHeader },
}: { label: string; noteId: string; localeStrings: { yes: string; no: string; confirmMessage: string; confirmHeader: string } }) {
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();
    // @ts-ignore
    const {locale} = localeStore.getState()
    const {t} = useTranslation("common", {lng: locale})

	const handleClick = () => {
		confirmDialog({
			draggable: false,
			acceptLabel: yes,
			rejectLabel: no,
			message: confirmMessage,
			header: confirmHeader,
			icon: "pi pi-exclamation-triangle",
			breakpoints: { "640px": "85vw" },
			blockScroll: true,
			accept: () => {
				setPending(true);
				deleteNote(noteId)
					.then(() => {
                        toast.success(t("note-delete-success"))
						updateNotes();
						router.back();

						setTimeout(() => {
							router.refresh();
						}, 200);
					})
                    .catch(() => toast.error(t("note-delete-error")))
					.finally(() => setPending(false));
			},
			reject: () => {},
		});
	};
	return (
		<Button
			icon={pending ? <BarLoader width="20px" height="20px" color="#eee" /> : <DeleteIcon width="20px" height="20px" />}
			onClick={handleClick}
			type="button"
			tooltip={label}
			tooltipOptions={{ position: "bottom" }}
		/>
	);
}

export default DeleteButton;

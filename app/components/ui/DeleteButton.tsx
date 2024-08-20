"use client";

import DeleteIcon from "../icons/DeleteIcon";
import { deleteNote } from "@/app/utils/notes/deleteNote";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { useState } from "react";
import BarLoader from "./BarLoader";
import { useRouter } from "next/navigation";
import { updateNotes } from "@/app/utils/updateData";

function DeleteButton({
	label,
	noteId,
	localeStrings: { yes, no, confirmMessage, confirmHeader },
}: { label: string; noteId: string; localeStrings: { yes: string; no: string; confirmMessage: string; confirmHeader: string } }) {
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();

	const handleClick = () => {
		confirmDialog({
			draggable: false,
			acceptLabel: yes,
			rejectLabel: no,
			message: confirmMessage,
			header: confirmHeader,
			icon: "pi pi-exclamation-triangle",
			accept: () => {
				setPending(true);
				deleteNote(noteId)
					.then(() => {
						updateNotes();
						router.back();

						setTimeout(() => {
							router.refresh();
						}, 200);
					})
					.finally(() => setPending(false));
			},
			reject: () => { },
		});
	};
	return (
		<>
			<Button
				icon={pending ? <BarLoader width="20px" height="20px" color="#eee" /> : <DeleteIcon width="20px" height="20px" />}
				onClick={handleClick}
				type="button"
				tooltip={label}
				tooltipOptions={{ position: "bottom" }}
			/>
		</>
	);
}

export default DeleteButton;

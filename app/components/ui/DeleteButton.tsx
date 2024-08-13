"use client";

import deleteButtonStyles from "@/styles/DeleteButton.module.css";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteNote } from "@/app/utils/notes/deleteNote";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

function DeleteButton({ label, noteId, localeStrings: { yes, no, confirmMessage, confirmHeader } }: { label: string; noteId: string; localeStrings: { yes: string; no: string; confirmMessage: string; confirmHeader: string } }) {
	const handleClick = () => {
		confirmDialog({
			acceptLabel: yes,
			rejectLabel: no,
			message: confirmMessage,
			header: confirmHeader,
			icon: "pi pi-exclamation-triangle",
			accept: () => deleteNote(noteId),
			reject: () => {},
		});
	};
	return (
		<>
			<ConfirmDialog />
			<Button icon={<DeleteIcon width="20px" height="20px" />}  onClick={handleClick} type="button" tooltip={label} tooltipOptions={{ position: "bottom" }} />
		</>
	);
}

export default DeleteButton;

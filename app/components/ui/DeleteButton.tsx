"use client";

import deleteButtonStyles from "@/styles/DeleteButton.module.css";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteNote } from "@/app/utils/notes/deleteNote";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

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
			<button onClick={handleClick} type="button" data-title={label} className={deleteButtonStyles.delete__button__container}>
				<DeleteIcon width="18px" height="18px" />
			</button>
		</>
	);
}

export default DeleteButton;

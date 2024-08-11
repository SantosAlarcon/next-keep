"use client";

import deleteButtonStyles from "@/styles/DeleteButton.module.css";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteNote } from "@/app/utils/notes/deleteNote";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { useState } from "react";

function DeleteButton({ label, noteId, confirmString }: { label: string; noteId: string; confirmString: string }) {
	const [visible, setVisible] = useState<boolean>(false);
	const handleClick = () => {
        setVisible(true)
		confirmDialog({
			message: confirmString,
			header: "Proceed with the deletion?",
			icon: "pi pi-exclamation-triangle",
			accept: () => deleteNote(noteId),
			reject: () => setVisible(false),
		});
	};
	return (
		<button onClick={handleClick} type="button" data-title={label} className={deleteButtonStyles.delete__button__container}>
			<ConfirmDialog visible={visible} onHide={() => setVisible(false)} />
			<DeleteIcon width="18px" height="18px" />
		</button>
	);
}

export default DeleteButton;

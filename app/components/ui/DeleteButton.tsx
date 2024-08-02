"use client";

import deleteButtonStyles from "@/styles/DeleteButton.module.css";
import DeleteIcon from "../icons/DeleteIcon";
import { deleteNote } from "@/app/utils/notes/deleteNote";

function DeleteButton({ label, noteId, confirmString }: { label: string; noteId: string, confirmString: string }) {
	const handleClick = () => {
        const answer = confirm(confirmString);

        if (answer) {
            deleteNote(noteId)
        }
    };
	return (
		<button onClick={handleClick} type="button" title={label} className={deleteButtonStyles.delete__button__container}>
			<DeleteIcon width="18px" height="18px" />
			<span className={deleteButtonStyles.delete__button__label}>{label}</span>
		</button>
	);
}

export default DeleteButton;

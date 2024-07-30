"use client";

import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { updateNote } from "@/app/utils/notes/updateNote";

const UpdateNoteButton = ({ label }: { label: string }) => {
    return (
        <button onClick={updateNote} type="button" className={saveButtonStyles.save__button__container}>
            <span className={saveButtonStyles.save__button__label}>{label}</span>
        </button>
    );
};

export default UpdateNoteButton;

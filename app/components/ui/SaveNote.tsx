"use client";

import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { saveNewNote } from "@/app/utils/notes/saveNewNote";

const SaveNote = ({ title }: { title: string }) => {
    return (
        <button onClick={saveNewNote} type="button" className={saveButtonStyles.save__button__container}>
            <span className={saveButtonStyles.save__button__title}>{title}</span>
        </button>
    );
};

export default SaveNote;

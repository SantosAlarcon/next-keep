"use client";

import UpdateNoteContext from "@/app/context/UpdateNoteContext";
import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { updateNote } from "@/app/utils/notes/updateNote";
import { useContext } from "react";

const UpdateNoteButton = ({ label }: { label: string }) => {
    // @ts-ignore
    const {updatedNote} = useContext(UpdateNoteContext)

    return (
        <button onClick={() => updateNote(updatedNote)} type="button" className={saveButtonStyles.save__button__container}>
            <span className={saveButtonStyles.save__button__label}>{label}</span>
        </button>
    );
};

export default UpdateNoteButton;

"use client";

import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { saveNewNote } from "@/app/utils/notes/saveNewNote";
import BarLoader from "./BarLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SaveNoteButton = ({ title }: { title: string }) => {
    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter()

    const handleCreateNote = () => {
        setPending(true);
        saveNewNote()
            .then(() => {
                router.back()

                const temp = setTimeout(() => {
                    router.refresh()
                }, 1000)

                clearTimeout(temp)
            })
            .finally(() => setPending(false))
    }

    return (
        <button onClick={handleCreateNote} type="button" className={saveButtonStyles.save__button__container}>
            <span className={saveButtonStyles.save__button__title}>{pending ? <BarLoader width="24px" height="24px" color="#eee" /> : title}</span>
        </button>
    );
};

export default SaveNoteButton;

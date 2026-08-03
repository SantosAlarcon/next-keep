"use client";

import { Spinner } from "@primeicons/react/spinner";
import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { toast } from "sonner";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { saveNewNote } from "@/app/utils/notes/saveNewNote";
import { updateNotes } from "@/app/utils/updateData";

const SaveNoteButton = ({ title }: { title: string }) => {
    const {t} = useT("common")
	const newNote = useNewNoteStore((state) => state.newNote);
	const router = useRouter();

	const [pending, setPending] = useState<boolean>(false);

	const handleCreateNote = () => {
		if (newNote.title === "") {
			toast.error(t("title-missing"), { position: "top-center" });
		} else if (newNote.data === "") {
			toast.error(t("text-missing"), { position: "top-center" });
		} else {
			setPending(true);
			newNote.lastUpdated = new Date().toISOString();
			// setNewNote({...newNote, lastUpdated: new Date().toISOString()})
			// @ts-ignore
			saveNewNote(newNote)
				.then(() => {
					toast.success(t("note-saved", {name: newNote.title}));
					updateNotes();
					router.back();

					setTimeout(() => {
						router.refresh();
					}, 50);
				})
				.catch(() => toast.error(t("error-saving-note")))
				.finally(() => setPending(false));
		}
	};

	return (
		<Button
			aria-label={title}
			onClick={() => handleCreateNote()}
			className={saveButtonStyles.save__button__container}
		>
			<span className={saveButtonStyles.save__button__title}>
				{pending ? <Spinner width="20" height="20" /> : title}
			</span>
		</Button>
	);
};

export default SaveNoteButton;

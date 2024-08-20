"use client";

import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { saveNewNote } from "@/app/utils/notes/saveNewNote";
import BarLoader from "./BarLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNotes } from "@/app/utils/updateData";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import type { Note } from "@/app/types";
import i18nClient from "@/app/i18n-client";
import { toast } from "sonner";

const SaveNoteButton = ({ lang, title }: { lang: string, title: string }) => {
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();
	const newNote: Note = useNewNoteStore.getState().newNote;

	const t = i18nClient.getFixedT(lang, ["common"])
	const handleCreateNote = () => {
		if (newNote.title === "") {
			toast.error(t("title-missing"), { position: "top-center" });
		} else if (newNote.data === "") {
			toast.error(t("text-missing"), { position: "top-center" });
		} else {
			setPending(true);
			saveNewNote(newNote)
				.then(() => {
					toast.success(t("note-saved"));
					router.back();
					updateNotes();

					setTimeout(() => {
						router.refresh();
					}, 200);
				}).catch(() => toast.error(t("error-saving-note")))
				.finally(() => setPending(false));
		};

	};

	return (
		<button onClick={handleCreateNote} type="button" className={saveButtonStyles.save__button__container}>
			<span className={saveButtonStyles.save__button__title}>
				{pending ? <BarLoader width="24px" height="24px" color="#eee" /> : title}
			</span>
		</button>
	);
};


export default SaveNoteButton;

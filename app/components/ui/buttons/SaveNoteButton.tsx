"use client";

import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { saveNewNote } from "@/app/utils/notes/saveNewNote";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNotes } from "@/app/utils/updateData";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import i18nClient from "@/app/i18n-client";
import { toast } from "sonner";

const SaveNoteButton = ({ lang, title }: { lang: string; title: string }) => {
	const t = i18nClient.getFixedT(lang, ["common"]);
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
					toast.success(t("note-saved"));
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
		<button
			aria-label={title}
			onClick={() => handleCreateNote()}
			type="button"
			className={saveButtonStyles.save__button__container}
		>
			<span className={saveButtonStyles.save__button__title}>
				{pending ? <span className="pi pi-spin pi-spinner" /> : title}
			</span>
		</button>
	);
};

export default SaveNoteButton;

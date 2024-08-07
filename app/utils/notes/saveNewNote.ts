import type { Note } from "@/app/types";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import { toast } from "sonner";
import initTranslations from "@/app/i18n";
import { getCurrentLocale } from "../getCurrentLocale";

export const saveNewNote = async () => {
	const newNote: Note = useNewNoteStore.getState().newNote;
	const locale = await getCurrentLocale();

	const { t } = await initTranslations(locale, ["common"])

	const addNoteToDB = async () => {
		if (newNote.title === "") {
			toast.error(t("title-missing"));
		} else if (newNote.data === "") {
			toast.error(t("text-missing"));
		} else {
			const response = await fetch("/api/notes", {
				method: "POST",
				body: JSON.stringify(newNote),
			})

			if (response.status === 201) {
				toast.success(t("note-saved"));
			} else {
				toast.error(t("error-saving-note"))
			}
		}
	};

	addNoteToDB();
};

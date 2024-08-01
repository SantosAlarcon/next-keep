import type { Note } from "@/app/types";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import { toast } from "sonner";
import initTranslations from "@/app/i18n";
import { getCurrentLocale } from "../getCurrentLocale";

export const saveNewNote = async () => {
	const newNote: Note = useNewNoteStore.getState().newNote;
    const locale = await getCurrentLocale();
    console.log(locale)

    const {t} = await initTranslations(locale, ["common"])

	const addNoteToDB = async () => {
		if (newNote.title === "") {
			toast.error(t("title-missing"));
		} else if (newNote.data === "") {
			toast.error(t("text-missing"));
		} else {
			await fetch("/api/notes", {
				method: "POST",
				body: JSON.stringify(newNote),
			})
				.then(() => toast.success("Saving complete"))
				.catch(() => toast.error("Failed to create new note"));
		}
	};

	addNoteToDB();
};

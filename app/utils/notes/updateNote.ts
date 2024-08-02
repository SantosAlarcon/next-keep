import { Note } from "@/app/types"
import { getCurrentLocale } from "../getCurrentLocale";
import initTranslations from "@/app/i18n";
import { toast } from "sonner";

export const updateNote = async (updatedNote: Note) => {
	const locale = await getCurrentLocale();

	const { t } = await initTranslations(locale, ["common"])

	const updateNoteFunc = async () => {
		const response = await fetch(`/api/notes?id=${updatedNote.id}`, {
			method: "PUT",
			body: JSON.stringify(updatedNote)
		})

		if (response.status !== 200) {
			toast.error(t("note-update-error"))
		} else {
			toast.success(t("note-update-success"))
		}
	}

	updateNoteFunc()
}

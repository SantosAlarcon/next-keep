import initTranslations from "@/app/i18n";
import { getCurrentLocale } from "../getCurrentLocale";
import { toast } from "sonner";

export const deleteNote = async (noteId: string) => {
	const locale = await getCurrentLocale();
	const { t } = await initTranslations(locale, ["common"]);

	const deleteNoteFunc = async () => {
		if (noteId !== "") {
			const response = await fetch(`/api/notes?id=${noteId}`, {
				method: "DELETE"
			})

			if (response.status === 200) {
				toast.success(t("note-delete-success"))
			} else {
				toast.error(t("note-delete-error"))
			}
		}
	}

	deleteNoteFunc()
}

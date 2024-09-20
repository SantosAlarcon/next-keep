import type { Note } from "@/app/types"
import { getCurrentLocale } from "../getCurrentLocale";
import initTranslations from "@/app/i18n";
import { toast } from "sonner";
import { appwriteAPIKey, appwriteProjectId, notesEndpoint } from "@/app/constants";

export const updateNote = async (updatedNote: Note) => {
	const locale = await getCurrentLocale();

	const { t } = await initTranslations(locale, ["common"])

	const updateNoteFunc = async () => {
		const response = await fetch(`${notesEndpoint}/${updatedNote.$id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-Appwrite-Project": appwriteProjectId,
				"X-Appwrite-Key": appwriteAPIKey
			},
			body: JSON.stringify({
				data: updatedNote
			})
		})

		if (response.status !== 200) {
			toast.error(t("note-update-error"))
		} else {
			toast.success(t("note-update-success"))
		}
	}

	updateNoteFunc()
}

import { useUpdateNoteStore } from "@/app/store/updateNoteStore"

export const updateNote = () => {
	const updatedNote = useUpdateNoteStore.getState().updateNote
	const updateNoteFunc = async () => {
		await fetch(`/api/notes?id=${updatedNote.id}`, {
			method: "PUT",
			body: JSON.stringify(updatedNote)
		})
	}

	updateNoteFunc()
}

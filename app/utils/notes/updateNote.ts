import { Note } from "@/app/types"

export const updateNote = (updatedNote: Note) => {
	const updateNoteFunc = async () => {
		await fetch(`/api/notes?id=${updatedNote.id}`, {
			method: "PUT",
			body: JSON.stringify(updatedNote)
		})
	}

	updateNoteFunc()
}

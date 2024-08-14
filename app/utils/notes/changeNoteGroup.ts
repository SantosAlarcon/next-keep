import type { Note } from "@/app/types"
import { toast } from "sonner"

export const changeNoteGroup = async (note: Note, groupTitle: string) => {
	const group = await fetch(`/api/groups?title=${groupTitle}`).then((response) => response.json())

	try {
		await fetch(`/api/notes?id=${note.id}`, {
			method: "PUT",
			body: JSON.stringify({
				title: note.title,
				group: group.id
			})
		})

		toast.success(`Note ${note.title} moved to ${group.title} group`)
	} catch (error) {
		console.error(error)
	}

}

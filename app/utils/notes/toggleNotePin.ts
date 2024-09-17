import type { Note } from "@/app/types";

export const toggleNotePin = async (note: Note) => {
	return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notes_appwrite?id=${note.$id}`, {
		method: "PUT",
		body: JSON.stringify({
			isPinned: !note.isPinned
		})
	});
};

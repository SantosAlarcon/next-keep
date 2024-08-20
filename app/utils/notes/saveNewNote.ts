import type { Note } from "@/app/types";

export const saveNewNote = async (newNote: Note) => {
	return await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notes`, {
		method: "POST",
		body: JSON.stringify(newNote),
	})
};

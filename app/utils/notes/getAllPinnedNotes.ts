import type { Note } from "@/app/types";
import { getAllNotes } from "./getAllNotes";

export const getAllPinnedNotes = async () => {
	const pinnedNotes = await getAllNotes();
	return pinnedNotes.filter((note: Note) => note.isPinned === true);
};

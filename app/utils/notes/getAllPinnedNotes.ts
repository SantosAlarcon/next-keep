import { getAllNotes } from "./getAllNotes";
import type { Note } from "@/app/types";

export const getAllPinnedNotes = async () => {
	const pinnedNotes = await getAllNotes();
	return pinnedNotes.filter((note: Note) => note.isPinned === true);
};

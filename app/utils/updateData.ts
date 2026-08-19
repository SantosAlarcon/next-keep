import { dataStore } from "../store/dataStore";
import type { Group, Note } from "../types";
import { getAllGroups } from "./groups/getAllGroups";
import { getAllNotes } from "./notes/getAllNotes";

export const updateGroups = async () => {
	// @ts-ignore
	const { setAllGroups, setAllGroupTitles } = dataStore.getState();

	const groups: Group[] = await getAllGroups();
	setAllGroups(groups);
	setAllGroupTitles(groups.map((g: Group) => g.title));
};

export const updateNotes = async () => {
	// @ts-ignore
	const { setAllNotes, setAllPinnedNotes } = dataStore.getState();

	const notes: Note[] = await getAllNotes();
	setAllNotes(notes);
	setAllPinnedNotes(notes.filter((note: Note) => note.isPinned === true));
};

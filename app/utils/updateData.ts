"use client";

import { dataStore } from "../store/dataStore";
import type { Group, Note } from "../types";
import { getAllGroups } from "./groups/getAllGroups";
import { getAllGroupTitles } from "./groups/getAllGroupTitles";
import { getAllNotes } from "./notes/getAllNotes";
import { getAllPinnedNotes } from "./notes/getAllPinnedNotes";

export const updateGroups = () => {
	// @ts-ignore
	const { setAllGroups, setAllGroupTitles } = dataStore.getState();

	getAllGroups().then((groups: Group[]) => setAllGroups(groups));
	getAllGroupTitles().then((groupTitles: string[]) => setAllGroupTitles(groupTitles));
};

export const updateNotes = () => {
	// @ts-ignore
	const { setAllNotes, setAllPinnedNotes } = dataStore.getState();

	getAllNotes().then((notes: Note[]) => setAllNotes(notes));
	getAllPinnedNotes().then((pinnedNotes: Note[]) => setAllPinnedNotes(pinnedNotes));
};

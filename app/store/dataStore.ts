import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Group, Note } from "../types";

export type DataStoreProps = {
    allGroupTitles: string[],
    allGroups: Group[],
    allNotes: Note[],
    allNoteAmounts: object,
    allPinnedNotes: Note[]
}

export const dataStore = create(devtools((set) => ({
    allGroupTitles: [],
    setAllGroupTitles: (titles: string[]) => set({allGroupTitles: titles}),
    allGroups: [],
    setAllGroups: (groups: Group[]) => set({allGroups: groups}),
    allNotes: [],
    setAllNotes: (notes: Note[]) => set({allNotes: notes}),
    allNoteAmounts: [],
    setAllNoteAmounts: (noteAmounts: Note[]) => set({allNoteAmounts: noteAmounts}),
    allPinnedNotes: [],
    setAllPinnedNotes: (pinnedNotes: Note[]) => set({allPinnedNotes: pinnedNotes}),
}), {name: "Data Store", enabled: process.env.NODE_ENV !== "production"}))

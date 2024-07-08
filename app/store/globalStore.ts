import { create } from "zustand";
import { devtools } from "zustand/middleware";

type GlobalFields = {
    selectedGroup: string,
    selectedNoteId: string,
}

type GlobalMethods = {
    setSelectedGroup: (group: string) => void,
    setSelectedNoteId: (id: string) => void,
}

export const globalStore = create<GlobalFields & GlobalMethods>(devtools((set) => ({
    selectedGroup: "0",
    selectedNoteId: "0",
    setSelectedGroup: (group: string) => set({selectedGroup: group}),
    setSelectedNoteId: (id: string) => set({selectedNoteId: id}),
}), {name: "Global Store", enabled: true}))

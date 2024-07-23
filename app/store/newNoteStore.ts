import { create } from "zustand";
import { devtools } from "zustand/middleware";

type newNoteFields = {
	newNote: {
		id: string,
		title: string,
		group: string | null,
		data: string,
		isPinned: boolean,
		publishedDate: string,
		updatedDate: string,
	}
}

type newNoteMethods = {
	setNewNote: (field: any) => void,
	reset: () => void
}

// @ts-ignore
const newNoteStore = (set) => ({
	newNote: {
		id: crypto.randomUUID(),
		group: null,
		title: "",
		isPinned: false,
		data: "",
		publishedDate: new Date().toISOString(),
		updatedDate: new Date().toISOString(),
	},
	// @ts-ignore
	setNewNote: (field) => set((state) => ({ newNote: { ...state.newNote, ...field } })),
	reset: () => set({ newNote: { id: crypto.randomUUID(), group: null, title: "", isPinned: false, data: "", publishedDate: new Date(), updatedDate: new Date() } }),
})

// @ts-ignore
export const useNewNoteStore = create<newNoteFields & newNoteMethods>(devtools(newNoteStore, {name: "New Note Store", enabled: process.env.NODE_ENV === "development"}))

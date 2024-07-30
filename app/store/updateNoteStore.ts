
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type updateNoteFields = {
	updateNote: {
		id: string,
		title: string,
		group: string | null,
		data: string,
		isPinned: boolean,
		publishedDate: string,
		updatedDate: string,
	}
}

type updateNoteMethods = {
	setUpdateNote: (field: any) => void,
	reset: () => void
}

// @ts-ignore
const updateNoteStore = (set) => ({
	updateNote: {
		id: crypto.randomUUID(),
		group: null,
		title: "",
		isPinned: false,
		data: "",
		publishedDate: new Date().toISOString(),
		updatedDate: new Date().toISOString(),
	},
	// @ts-ignore
	setUpdateNote: (field) => set((state: updateNoteFields) => ({ updateNote: { ...state.updateNote, ...field } })),
	reset: () => set({ updateNote: { id: crypto.randomUUID(), group: null, title: "", isPinned: false, data: "", publishedDate: new Date(), updatedDate: new Date() } }),
})

// @ts-ignore
export const useUpdateNoteStore = create<updateNoteFields & updateNoteMethods>(devtools(updateNoteStore, {name: "Update Note Store", enabled: process.env.NODE_ENV === "development"}))

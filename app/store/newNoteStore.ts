import { create } from "zustand";

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
		publishedDate: "",
		updatedDate: "",
	},
	// @ts-ignore
	setNewNote: (field) => set((state) => ({ newNote: { ...state.newNote, ...field } })),
	reset: () => set({ newNote: { id: crypto.randomUUID(), group: null, title: "", isPinned: false, data: "", publishedDate: "", updatedDate: "" } }),
})

// @ts-ignore
export const useNewNoteStore = create<newNoteFields & newNoteMethods>(newNoteStore)

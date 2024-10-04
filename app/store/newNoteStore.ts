import { create } from "zustand";

type newNoteFields = {
	newNote: {
		title: string,
		group: string | null,
		data: string,
		isPinned: boolean,
		userId: string,
		$createdAt: string,
		$updatedAt: string,
		lastUpdated: string
	}
}

type newNoteMethods = {
	setNewNote: (field: any) => void,
	reset: () => void
}

// @ts-ignore
const newNoteStore = (set) => ({
	newNote: {
		group: null,
		title: "",
		isPinned: false,
		data: "",
		userId: "",
		$createdAt: "",
		$updatedAt: "",
		lastUpdated: ""
	},
	// @ts-ignore
	setNewNote: (field) => set((state) => ({ newNote: { ...state.newNote, ...field } })),
	reset: () => set({ newNote: { group: null, title: "", isPinned: false, data: "", userId: "", $createdAt: "", $updatedAt: "", lastUpdated: "" } }),
})

// @ts-ignore
export const useNewNoteStore = create<newNoteFields & newNoteMethods>(newNoteStore)

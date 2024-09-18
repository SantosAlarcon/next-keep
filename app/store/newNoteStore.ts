import { ID } from "appwrite";
import { create } from "zustand";

type newNoteFields = {
	newNote: {
		$id: string,
		title: string,
		group: string | null,
		data: string,
		isPinned: boolean,
		userId: string,
		$createdAt: string,
		$updatedAt: string
	}
}

type newNoteMethods = {
	setNewNote: (field: any) => void,
	reset: () => void
}

// @ts-ignore
const newNoteStore = (set) => ({
	newNote: {
		$id: ID.unique(),
		group: null,
		title: "",
		isPinned: false,
		data: "",
		userId: "",
		$createdAt: "",
		$updatedAt: ""
	},
	// @ts-ignore
	setNewNote: (field) => set((state) => ({ newNote: { ...state.newNote, ...field } })),
	reset: () => set({ newNote: { group: null, title: "", isPinned: false, data: "", userId: "", $createdAt: "", $updatedAt: "", $id: ID.unique() } }),
})

// @ts-ignore
export const useNewNoteStore = create<newNoteFields & newNoteMethods>(newNoteStore)

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getNoteById } from "../utils/database/notes/getNoteById";

type updateNoteMethods = {
	setUpdateNote: (field: any) => void,
	changeUpdateNote: (noteId: string) => void,
	reset: () => void
}

// @ts-ignore
export const useUpdateNoteStore = create(persist((set) => ({
	updateNote: {},
	// @ts-ignore
	setUpdateNote: (field) => set((state) => ({ updateNote: { ...state.updateNote, ...field } })),
    changeUpdateNote: async (noteId: string) => {
        const response = await getNoteById(noteId);
        set({updateNote: response})
    },
	reset: () => set({ updateNote: {} }),
}), {name: "update-note", storage: createJSONStorage(() => localStorage)}))

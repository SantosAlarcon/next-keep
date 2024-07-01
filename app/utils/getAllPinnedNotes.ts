import notes from "@/data/notes.json"
import type { Note } from "@/app/types"

export const getAllPinnedNotes = () => {
    return notes.filter((note: Note) => note.isPinned)
}

import notes from "@/data/notes.json"

export const getAllPinnedNotes = () => {
    return notes.filter((note) => note.isPinned)
}

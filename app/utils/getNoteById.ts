import notes from "@/data/notes.json"

export const getNoteById = (id: string) => {
    return notes.find((note) => note.id === id)
}

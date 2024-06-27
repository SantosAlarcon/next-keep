import notes from "@/data/notes.json"

export const getNotesByGroup = (id: string) => {
    return notes.filter((note) => note.id === id)
}

import notes from "@/data/notes.json"

export const getNotesByGroup = (group: string) => {
    return notes.filter((note) => note.group === group)
}

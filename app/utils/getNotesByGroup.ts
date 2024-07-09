import notes from "@/data/notes.json"

export const getNotesByGroup = (groupId: string) => {
    return notes.filter((note) => note.group === groupId)
}

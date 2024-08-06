export const getAllNotes = async () => {
    const response = await fetch("/api/notes")
    const allNotes = await response.json()
    return allNotes
}

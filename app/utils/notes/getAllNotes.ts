export const getAllNotes = async () => {
    const response = await fetch(process.env.URL + "/api/notes")
    const allNotes = await response.json()
    return allNotes
}

export const getAllPinnedNotes = async () => {
    const response = await fetch(process.env.URL + "/api/notes?pinned=true");
    const pinnedNotes = await response.json()

    return pinnedNotes
}

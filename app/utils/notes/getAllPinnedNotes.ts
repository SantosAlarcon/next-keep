export const getAllPinnedNotes = async () => {
    const response = await fetch("/api/notes?pinned=true");
    const pinnedNotes = await response.json()

    return pinnedNotes
}

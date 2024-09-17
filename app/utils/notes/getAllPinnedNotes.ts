export const getAllPinnedNotes = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notes_appwrite?pinned=true`);
    const pinnedNotes = await response.json()

    return pinnedNotes
}

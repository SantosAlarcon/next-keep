
export const getNoteAmountByGroups = async () => {
    const response = await fetch("/api/notes?amount=true");
    const pinnedNotes = await response.json()

    return pinnedNotes
}


export const getNoteAmountByGroups = async () => {
    const response = await fetch(process.env.URL + "/api/notes?amount=true");
    const pinnedNotes = await response.json()

    return pinnedNotes
}

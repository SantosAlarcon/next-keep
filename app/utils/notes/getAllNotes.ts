export const getAllNotes = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notes`)
    const allNotes = await response.json()
    return allNotes
}

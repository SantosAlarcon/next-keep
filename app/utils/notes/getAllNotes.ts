import { getSession } from "../getSession"

export const getAllNotes = async () => {
    const session = await getSession();
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notes_appwrite?userId=${session.userId}`)
    const allNotes = await response.json()
    return allNotes
}

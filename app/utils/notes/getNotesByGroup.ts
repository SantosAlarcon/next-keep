export const getNotesByGroup = async (groupId: string) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notes_appwrite?group=${groupId}`)
	const notes = await response.json()
	return notes
}

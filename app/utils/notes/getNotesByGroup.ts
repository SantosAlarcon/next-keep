export const getNotesByGroup = async (groupId: string) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notes?group=${groupId}`)
	const notes = await response.json()
	return notes
}

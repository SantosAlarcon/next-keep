export const getNoteAmountByGroups = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_URL}/api/notes_appwrite?amount=true`,
	);
	const pinnedNotes = await response.json();

	return pinnedNotes;
};

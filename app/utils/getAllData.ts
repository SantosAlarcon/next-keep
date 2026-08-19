import { getAllGroups } from "./groups/getAllGroups";
import { getAllNotes } from "./notes/getAllNotes";

export async function getAllData() {
	const [allNotes, allGroups] = await Promise.all([
		getAllNotes(),
		getAllGroups(),
	]);

	const allPinnedNotes = allNotes.filter(
		(note: { isPinned: boolean }) => note.isPinned === true,
	);
	const allGroupTitles = allGroups?.map(
		(group: { title: string }) => group.title,
	);

	return { allNotes, allGroups, allPinnedNotes, allGroupTitles };
}

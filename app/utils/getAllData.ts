import { getAllGroups } from "./groups/getAllGroups";
import { getAllGroupTitles } from "./groups/getAllGroupTitles";
import { getAllNotes } from "./notes/getAllNotes";
import { getAllPinnedNotes } from "./notes/getAllPinnedNotes";
import { getNoteAmountByGroups } from "./notes/getNoteAmountByGroups";

export async function getAllData() {
	const [allNotes, allGroups, allPinnedNotes, allNoteAmounts, allGroupTitles] = await Promise.all([
		getAllNotes(),
		getAllGroups(),
		getAllPinnedNotes(),
		getNoteAmountByGroups(),
		getAllGroupTitles(),
	]);
	
	return { allNotes, allGroups, allPinnedNotes, allNoteAmounts, allGroupTitles };
}

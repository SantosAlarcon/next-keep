import { getAllGroups } from "./groups/getAllGroups";
import { getAllNotes } from "./notes/getAllNotes";
import { getAllPinnedNotes } from "./notes/getAllPinnedNotes";
import { getNoteAmountByGroups } from "./notes/getNoteAmountByGroups";

export async function getAllData() {
	const [allNotes, allGroups, allPinnedNotes, allNoteAmounts] = await Promise.all([
		getAllNotes(),
		getAllGroups(),
		getAllPinnedNotes(),
		getNoteAmountByGroups()
	])

	return { allNotes, allGroups, allPinnedNotes, allNoteAmounts }
}

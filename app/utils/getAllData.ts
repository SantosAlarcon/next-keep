import getGroupsByUser from "./database-appwrite/groups/getGroupsByUser";
import { getAllGroupTitles } from "./groups/getAllGroupTitles";
import { getAllNotes } from "./notes/getAllNotes";
import { getAllPinnedNotes } from "./notes/getAllPinnedNotes";
import { getNoteAmountByGroups } from "./notes/getNoteAmountByGroups";

export async function getAllData(userId: string) {
	const [allNotes, allGroups, allPinnedNotes, allNoteAmounts, allGroupTitles] = await Promise.all([
		getAllNotes(),
		getGroupsByUser(userId),
		getAllPinnedNotes(),
		getNoteAmountByGroups(),
		getAllGroupTitles(),
	]);
	
	return { allNotes, allGroups, allPinnedNotes, allNoteAmounts, allGroupTitles };
}

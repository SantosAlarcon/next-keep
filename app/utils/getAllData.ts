import { getGroupsByUser } from "./database-appwrite/groups/getGroupsByUser";
import { getAllPinnedNotes } from "./database-appwrite/notes/getAllPinnedNotes";
import getNotesByUser from "./database-appwrite/notes/getNotesByUser";
import { getAllGroupTitles } from "./groups/getAllGroupTitles";
import { getNoteAmountByGroups } from "./notes/getNoteAmountByGroups";

export async function getAllData(userId: string) {
	const [allNotes, allGroups, allPinnedNotes, allNoteAmounts, allGroupTitles] = await Promise.all([
		getNotesByUser(userId),
		getGroupsByUser(userId),
		getAllPinnedNotes(),
		getNoteAmountByGroups(),
		getAllGroupTitles(),
	]);
	
	return { allNotes, allGroups, allPinnedNotes, allNoteAmounts, allGroupTitles };
}

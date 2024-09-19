import { getAllPinnedNotes } from "./notes/getAllPinnedNotes";
import { getAllGroups } from "./groups/getAllGroups";
import { getAllGroupTitles } from "./groups/getAllGroupTitles";
import { getAllNotes } from "./notes/getAllNotes";

export async function getAllData(userId: string) {
	const [allNotes, allGroups, allPinnedNotes, allGroupTitles] = await Promise.all([
		getAllNotes(),
		getAllGroups(),
		getAllPinnedNotes(),
		getAllGroupTitles(),
	]);
	
	return { allNotes, allGroups, allPinnedNotes, allGroupTitles };
}

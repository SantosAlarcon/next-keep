import { getAllGroups } from "./groups/getAllGroups";
import { getAllGroupTitles } from "./groups/getAllGroupTitles";
import { getAllNotes } from "./notes/getAllNotes";
import { getAllPinnedNotes } from "./notes/getAllPinnedNotes";

export async function getAllData() {
	const [allNotes, allGroups, allPinnedNotes, allGroupTitles] =
		await Promise.all([
			getAllNotes(),
			getAllGroups(),
			getAllPinnedNotes(),
			getAllGroupTitles(),
		]);

	return { allNotes, allGroups, allPinnedNotes, allGroupTitles };
}

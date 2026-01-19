import { appwriteDatabase } from "@/app/appwrite";
import { getSession } from "../../getSession";
import { Query } from "appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";

export async function getNoteAmountsByGroups() {
	const session = getSession();
	const response = await appwriteDatabase.listDocuments(
		databaseID,
		notesCollectionID,
		[
			// @ts-ignore
			Query.equal("userId", session.userId),
		],
	);

	const amountMap = new Map<string, number>();
	// @ts-ignore
	for (const note of response) {
		if (note.group !== null) {
			amountMap.set(note.group, note._count._all);
		}
	}

	const amountMapObject = Object.fromEntries(amountMap);

	return amountMapObject;
}

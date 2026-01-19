import { ID } from "appwrite";
import { appwriteDatabase } from "@/app/appwrite";
import { databaseID, notesCollectionID } from "@/app/constants";
import type { Note } from "@/app/types";
import { getSession } from "../../getSession";

export const createNewNote = async (note: Note) => {
	const session = getSession();

	try {
		await appwriteDatabase.createRow({
			databaseId: databaseID,
			tableId: notesCollectionID,
			rowId: ID.unique(),
			data: {
				title: note.title,
				data: note.data,
				group: note.group,
				isPinned: note.isPinned,
				publishedDate: note.$createdAt,
				updatedDate: note.$updatedAt,
				userId: session.userId!,
			},
		});
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

import { Note } from "@/app/types";
import { prismaClient } from "../../PrismaClient";

export const updateNoteById = async (id: string, note: Note) => {
    try {
	await prismaClient.notes.update({
	    where: {
		id: id
	    },
	    data: {
		updatedDate: note.updatedDate,
		title: note.title,
		data: note.data,
		isPinned: note.isPinned,
		group: note.group
	    }
	})
	return true;
    } catch (error) {
	console.error(error)
	return false;
    }
}

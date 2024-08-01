import { Note } from "@/app/types";
import { prismaClient } from "../../PrismaClient";

export const updateNoteById = async (id: string, updatedNote: Note) => {
    try {
	await prismaClient.notes.update({
	    where: {
		id: id
	    },
	    data: {
		updatedDate: updatedNote.updatedDate,
		title: updatedNote.title,
		data: updatedNote.data,
		isPinned: updatedNote.isPinned,
		group: updatedNote.group
	    }
	})
	return true;
    } catch (error) {
	// @ts-ignore
	console.error("ERROR:", error?.meta?.cause)
	return false;
    }
}

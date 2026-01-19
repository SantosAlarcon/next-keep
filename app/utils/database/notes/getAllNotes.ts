import { prismaClient } from "../../PrismaClient";

export const getAllNotes = async () => {
	try {
		const notes = await prismaClient.notes.findMany();
		return notes;
	} catch (error) {
		console.error(error);
	}
};

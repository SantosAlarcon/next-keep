import { prismaClient } from "../../PrismaClient";

export const getNoteById = async (noteId: string) => {
	try {
		const note = await prismaClient.notes.findUnique({
			where: {
				id: noteId
			}
		})
		return note;
	} catch (error) {
		console.error(error)
	}
}

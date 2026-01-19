import { prismaClient } from "../../PrismaClient";

export const getNotesByGroup = async (groupId: string) => {
	try {
		const notes = await prismaClient.notes.findMany({
			where: {
				group: groupId,
			},
		});
		return notes;
	} catch (error) {
		console.error(error);
	}
};

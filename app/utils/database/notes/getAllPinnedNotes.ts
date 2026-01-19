import { prismaClient } from "../../PrismaClient";

export const getAllPinnedNotes = async () => {
	try {
		const pinnedNotes = prismaClient.notes.findMany({
			where: {
				isPinned: true,
			},
		});

		return pinnedNotes;
	} catch (error) {
		console.error(error);
	}
};

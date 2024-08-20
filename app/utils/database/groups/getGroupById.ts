import { prismaClient } from "../../PrismaClient";

export const getGroupById = async (id: string) => {
	try {
		const group = await prismaClient.groups.findUnique({
			where: {
				id: id,
			},
		});

		return group;
	} catch (error) {
		console.error(error);
	}
};

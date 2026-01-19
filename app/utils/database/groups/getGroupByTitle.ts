import { prismaClient } from "../../PrismaClient";

export const getGroupByTitle = async (title: string) => {
	const group = await prismaClient.groups.findFirst({
		where: {
			title,
		},
	});
	return group;
};

import { prismaClient } from "../../PrismaClient";

export const createNewGroup = async (title: string) => {
	const id = crypto.randomUUID();

	await prismaClient.groups.create({
		data: {
			id: id,
			title: title,
		},
	});
};

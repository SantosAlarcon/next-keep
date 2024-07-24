import { prismaClient } from "../../PrismaClient";

export const getAllGroups = async () => {

	try {
		const query = await prismaClient.groups.findMany()
		return query
	} catch (error) {
		console.error(error);
	}

}

import { prismaClient } from "../../PrismaClient";

export const getAllGroups = async () => {

	try {
		const query = await prismaClient.groups.findMany({
			orderBy: {
				title: 'asc',
			}
		})
		return query
	} catch (error) {
		console.error(error);
	}

}

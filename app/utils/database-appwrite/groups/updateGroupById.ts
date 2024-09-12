import { prismaClient } from "../../PrismaClient";

export const updateGroupById = async (id: string, title: string) => {
    try {
        await prismaClient.groups.update({
            where: {
                id: id
            },
            data: {
                title: title
            }
        })
        return true;

    } catch (error) {
        console.error(error)
        return false;
    }
}

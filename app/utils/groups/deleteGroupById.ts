import { prismaClient } from "../PrismaClient"

export const deleteGroupById = async (id: string) => {
    try {
        await prismaClient.groups.delete({
            where: {
                id: id
            }
        })

        return true;
    } catch (error) {
        // @ts-ignore
        console.error(error.meta.cause)

        return false;
    }
}

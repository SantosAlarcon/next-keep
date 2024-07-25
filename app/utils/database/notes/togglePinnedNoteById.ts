import { prismaClient } from "../../PrismaClient";

export const togglePinnedByNote = async (id: string, pinnedValue: boolean) => {
    try {
        await prismaClient.notes.update({
            where: {
                id: id
            }, 
            data: {
                isPinned: pinnedValue
            }
        })
        return true;
    } catch (error) {
        // @ts-ignore
        console.error(error.message)
        return false;
    }
}

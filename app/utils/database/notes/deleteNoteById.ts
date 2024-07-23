import { prismaClient } from "../../PrismaClient";

export const deleteNoteById = async (id: string) => {
    try {
        await prismaClient.notes.delete({
            where: {
                id: id
            }
        })
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

import { prismaClient } from "../../PrismaClient";
import type { Note } from "@/app/types";

export const createNewNote = async (note: Note) => {
    try {
        await prismaClient.notes.create({
            data: {
                // @ts-ignore
                id: note.id,
                title: note.title,
                data: note.data,
                group: note.group,
                isPinned: note.isPinned,
                publishedDate: note.publishedDate,
                updatedDate: note.updatedDate
            }
        })
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

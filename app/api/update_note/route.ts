import { useUpdateNoteStore } from "@/app/store/updateNoteStore";

export async function GET() {
    const updateNote = useUpdateNoteStore.getState().updateNote

    return Response.json(updateNote, {status: 200})
}

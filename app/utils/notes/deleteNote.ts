import { redirect } from "next/navigation"

export const deleteNote = (noteId: string) => {
    const deleteNoteFunc = async () => {
        if (noteId !== "") {
            try {
                await fetch(`/api/notes?id=${noteId}`, {
                    method: "DELETE"
                })
                return redirect("/notes/all") 
            } catch (error) {
                console.error(error)
            }
        }
    }

    deleteNoteFunc()
}

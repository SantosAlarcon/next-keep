import type { Note } from "@/app/types";
import { useNewNoteStore } from "@/app/store/newNoteStore";

export const saveNewNote = () => {
    const newNote: Note = useNewNoteStore.getState().newNote

    const addNoteToDB = async () => {
        if (newNote.title === "") {
                console.log("You have to write a title");
            } else if (newNote.data === "") {
                console.log("You need to write a text");
            } else {
                await fetch("/api/notes", {
                    method: "POST",
                    body: JSON.stringify(newNote)
                })
            .then(() => console.log("Saving complete"))
            .catch(() => console.error("Failed to create new note"))
        }
    }

    addNoteToDB()

}

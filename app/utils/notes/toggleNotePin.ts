import type { Note } from "@/app/types";

export const toggleNotePin = (note: Note) => {
    const togglePin = async () => {
        try {
            await fetch(`/api/notes?id=${note.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    isPinned: !note.isPinned
                })
            });
            console.log("Se ha cambiado el fijado con éxito!")

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    togglePin();
};

import { Note } from "../types"
import { useContext, createContext } from "react"

interface IUpdateNoteContext {
	updateNote: Note | undefined
	setUpdateNote: (note: Note) => void
}

const UpdateNoteContext = createContext<IUpdateNoteContext | undefined>(undefined)

export const useUpdateNoteContext = () => {
    const context = useContext(UpdateNoteContext);
	if (context === undefined) {
		throw new Error("useUpdateNoteContext must be used within a UpdateNoteProvider");
	}
	return context;
}

export default UpdateNoteContext

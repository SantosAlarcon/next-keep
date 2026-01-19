import type { Note } from "../types";
import { useContext, createContext } from "react";

interface IUpdatedNoteContext {
	updatedNote: Note | undefined;
	setUpdatedNote: (note: Note) => void;
}

const UpdateNoteContext = createContext<IUpdatedNoteContext | undefined>(
	undefined,
);

export const useUpdateNoteContext = () => {
	const context = useContext(UpdateNoteContext);
	if (context === undefined) {
		throw new Error(
			"useUpdateNoteContext must be used within a UpdateNoteProvider",
		);
	}
	return context;
};

export default UpdateNoteContext;

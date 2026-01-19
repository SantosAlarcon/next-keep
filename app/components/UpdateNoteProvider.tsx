"use client";

import { useState, type ReactNode } from "react";
import UpdateNoteContext from "../context/UpdateNoteContext";
import type { Note } from "../types";

const UpdateNoteProvider = ({
	children,
	value,
}: {
	children: ReactNode;
	value: Note;
}) => {
	const [updatedNote, setUpdatedNote] = useState<Note | undefined>(value);

	return (
		<UpdateNoteContext.Provider
			value={{ updatedNote: updatedNote, setUpdatedNote: setUpdatedNote }}
		>
			{children}
		</UpdateNoteContext.Provider>
	);
};

export default UpdateNoteProvider;

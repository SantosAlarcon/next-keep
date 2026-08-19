"use client";

import { useMemo, useState, type ReactNode } from "react";
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

	const contextValue = useMemo(
		() => ({ updatedNote, setUpdatedNote }),
		[updatedNote, setUpdatedNote],
	);

	return (
		<UpdateNoteContext.Provider value={contextValue}>
			{children}
		</UpdateNoteContext.Provider>
	);
};

export default UpdateNoteProvider;

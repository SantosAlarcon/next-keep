"use client"

import { useState, type ReactNode } from "react"
import UpdateNoteContext from '../context/UpdateNoteContext'
import { Note } from '../types'

const UpdateNoteProvider = ({ children, value }: { children: ReactNode, value: Note  }) => {
	const [updateNote, setUpdateNote] = useState<Note | undefined>(value)

	return (
		<UpdateNoteContext.Provider value={{ updateNote: updateNote, setUpdateNote: setUpdateNote }}>
			{children}
		</UpdateNoteContext.Provider>
	)
}

export default UpdateNoteProvider

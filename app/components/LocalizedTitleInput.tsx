"use client"

import { useRef } from "react"
import NewNotePageStyles from "@/app/styles/NewNotePage.module.css"
import { useNewNoteStore } from "../store/newNoteStore"

const LocalizedTitleInput = ({ placeholder }: { placeholder: string}) => {
	const newNoteTitle = useNewNoteStore((state) => state.newNote.title)
	const setNewNote = useNewNoteStore((state) => state.setNewNote)
	const inputRef = useRef<HTMLInputElement>(null);

	const onChangeHandler = () => {
	    setNewNote({ title: inputRef.current?.value || "" })
	}

	return (
		<input onChange={onChangeHandler} className={NewNotePageStyles.new__note__page__title} type="text" ref={inputRef} value={newNoteTitle} placeholder={placeholder} />
	)
}

export default LocalizedTitleInput

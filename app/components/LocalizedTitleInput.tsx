"use client";

import { useContext, useEffect, useRef } from "react";
import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import { useNewNoteStore } from "../store/newNoteStore";
import UpdateNoteContext from "../context/UpdateNoteContext";

const LocalizedTitleInput = ({ placeholder, title, isEditing }: { placeholder: string; title: string; isEditing: boolean }) => {
	const newNoteTitle = useNewNoteStore((state) => state.newNote.title);
	const setNewNote = useNewNoteStore((state) => state.setNewNote);
	const inputRef = useRef<string | null>(title);

	// @ts-ignore
	const { updatedNote, setUpdatedNote } = useContext(UpdateNoteContext);

	useEffect(() => {
		if (isEditing) {
			//@ts-ignore
			inputRef.current.value = updatedNote.title;
		} else {
			//@ts-ignore
			inputRef.current.value = newNoteTitle;
		}

		return () => {
			if (!isEditing) {
				setNewNote({ title: "" });
			}
		};
	}, []);

	const onChangeHandler = () => {
		if (isEditing) {
			//@ts-ignore
			setUpdatedNote({ ...updatedNote, title: inputRef?.current.value });
		} else {
			//@ts-ignore
			setNewNote({ title: inputRef?.current.value });
		}
	};

	return (
		<input
			autoFocus
			onChange={onChangeHandler}
			className={NewNotePageStyles.new__note__page__title}
			type="text"
			//@ts-ignore
			ref={inputRef}
			placeholder={placeholder}
		/>
	);
};

export default LocalizedTitleInput;

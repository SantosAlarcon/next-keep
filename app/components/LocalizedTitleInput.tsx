"use client";

import { useEffect, useRef } from "react";
import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import { useNewNoteStore } from "../store/newNoteStore";
import { getURL } from "next/dist/shared/lib/utils";
import { useUpdateNoteStore } from "../store/updateNoteStore";

const LocalizedTitleInput = ({ placeholder, title }: { placeholder: string, title: string }) => {
	// Get the URL
	const url = getURL();

	console.log(title)

	// This variable checks if the URL has the edit route in the URL
	const isEdit = url.includes("edit");

	const newNoteTitle = useNewNoteStore((state) => state.newNote.title);
	const setNewNote = useNewNoteStore((state) => state.setNewNote);
	const setUpdateNote = useUpdateNoteStore((state) => state.setUpdateNote);
	const inputRef = useRef<string | null>(title);

	useEffect(() => {
		if (isEdit) {
			inputRef.current.value = title
		} else {
			inputRef.current.value = newNoteTitle

		}
	}, [])

	const onChangeHandler = () => {
		if (isEdit) {
			setUpdateNote({ title: inputRef?.current.value });
		} else {
			setNewNote({ title: inputRef?.current.value });
		}
	};

	return (
		<input
			onChange={onChangeHandler}
			className={NewNotePageStyles.new__note__page__title}
			type="text"
			ref={inputRef}
			placeholder={placeholder}
		/>
	);
};

export default LocalizedTitleInput;

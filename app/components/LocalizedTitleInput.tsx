"use client";

import { useRef } from "react";
import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import { useNewNoteStore } from "../store/newNoteStore";
import { getURL } from "next/dist/shared/lib/utils";

const LocalizedTitleInput = ({ placeholder, title }: { placeholder: string, title: string }) => {
	const url = getURL();
	const isEdit = url.includes("edit");
	const newNoteTitle = useNewNoteStore((state) => state.newNote.title);
	const setNewNote = useNewNoteStore((state) => state.setNewNote);
	const inputRef = useRef<string | null>(title);

	const onChangeHandler = () => {
		setNewNote({ title: inputRef.current?.value });
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

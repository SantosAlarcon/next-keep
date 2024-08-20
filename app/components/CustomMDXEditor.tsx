"use client"

import { type FC, useContext, useState } from "react";
import UpdateNoteContext from "../context/UpdateNoteContext";
import { useNewNoteStore } from "../store/newNoteStore";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@/app/styles/wmd-editor.css";

interface EditorProps {
	text: string;
	editorRef?: MarkdownEditorRef;
	isEditing: boolean;
}

import MEditor, { type MarkdownEditorRef } from "@uiw/react-markdown-editor"

const CustomMDXEditor: FC<EditorProps> = ({ text, editorRef, isEditing }) => {
	const setNewNote = useNewNoteStore((state) => state.setNewNote)
	const [markdown, setMarkdown] = useState<string>(text)

	// @ts-ignore
	const { updatedNote, setUpdatedNote } = useContext(UpdateNoteContext)

	// When the Markdown changes, it updates the new note store
	const changeHandler = (value: string) => {
		if (isEditing) {
			setUpdatedNote({ ...updatedNote, data: value })
		} else {
			setNewNote({ data: value })
		}
	};

	return (
		<MEditor
			value={markdown}
			onChange={changeHandler}
			height="75vh"
			visible={true}
		/>
	);
};

export default CustomMDXEditor;

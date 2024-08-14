"use client"

import { useContext, type FC, type MutableRefObject } from "react";
import { useNewNoteStore } from "../store/newNoteStore";
import UpdateNoteContext from "../context/UpdateNoteContext";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@/app/styles/wmd-editor.css";

interface EditorProps {
	markdown: string;
	editorRef?: MutableRefObject<any>;
	isEditing: boolean;
}

import MEditor from "@uiw/react-md-editor"

const CustomMDXEditor: FC<EditorProps> = ({ markdown, editorRef, isEditing }) => {
	const setNewNote = useNewNoteStore((state) => state.setNewNote)
	// @ts-ignore
	const {updatedNote, setUpdatedNote} = useContext(UpdateNoteContext)
	
	// When the Markdown changes, it updates the new note store
	const changeHandler = () => {
		if (isEditing) {
			setUpdatedNote({ ...updatedNote, data: editorRef?.current?.getMarkdown() })
		} else {
			setNewNote({ data: editorRef?.current?.getMarkdown() })
		}
	};

	return (
		<MEditor
			ref={editorRef}
			value={markdown}
			onChange={changeHandler}
			height="75vh"
			visibleDragbar={false}
			highlightEnable={true}
		// @ts-ignore
		//translation={(key, defaultValue, interpolations) => {return t(key, defaultValue, interpolations)}}
		/>
	);
};

export default CustomMDXEditor;

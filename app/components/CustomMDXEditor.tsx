"use client"

import { type FC, useContext, useState } from "react";
import UpdateNoteContext from "../context/UpdateNoteContext";
import { useNewNoteStore } from "../store/newNoteStore";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@/app/styles/wmd-editor.css";

interface EditorProps {
	text: string;
	isEditing: boolean;
}

import MDEditor from "@uiw/react-md-editor";
import { SelectButton } from "primereact/selectbutton";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const CustomMDXEditor: FC<EditorProps> = ({ text, isEditing }) => {
	const setNewNote = useNewNoteStore((state) => state.setNewNote)
	const [markdown, setMarkdown] = useState<string>(text)
	const [view, setView] = useState<"Editor" | "Preview">("Editor")

	// @ts-ignore
	const { updatedNote, setUpdatedNote } = useContext(UpdateNoteContext)

	// When the Markdown changes, it updates the new note store
	const changeHandler = (value: string | undefined) => {
		setMarkdown(value || "")
		if (isEditing) {
			setUpdatedNote({ ...updatedNote, data: value })
		} else {
			setNewNote({ data: value })
		}
	};

	return (
		<>
			<SelectButton options={["Editor", "Preview"]} value={view} onChange={(e) => setView(e.value)} />
			<MDEditor
				autoFocus={true}
				value={markdown}
				visibleDragbar={false}
				extraCommands={[]}
				onChange={changeHandler}
				height="70vh"
				enableScroll={false}
				preview={view === "Editor" ? "edit" : "preview"}
				previewOptions={{
					rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
					remarkPlugins: [[remarkGfm, { singleTilde: false }]],
				}}
			/>
		</>
	);
};

export default CustomMDXEditor;

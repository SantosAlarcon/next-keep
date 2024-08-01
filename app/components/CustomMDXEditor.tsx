"use client"

import {
	AdmonitionDirectiveDescriptor,
	KitchenSinkToolbar,
	MDXEditor,
	type MDXEditorMethods,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	directivesPlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
} from "@mdxeditor/editor";
import { useContext, type FC, type MutableRefObject } from "react";
import "@mdxeditor/editor/style.css";
import "@/app/styles/mdx-editor.css";
import { useNewNoteStore } from "../store/newNoteStore";
import UpdateNoteContext from "../context/UpdateNoteContext";

interface EditorProps {
	markdown: string;
	editorRef?: MutableRefObject<MDXEditorMethods | null>;
	isEditing: boolean;
}

const CustomMDXEditor: FC<EditorProps> = ({ markdown, editorRef, isEditing }) => {
	const setNewNote = useNewNoteStore((state) => state.setNewNote)
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
		<MDXEditor
			className="dark-theme dark-editor dark-editor-custom"
			ref={editorRef}
			markdown={markdown}
			onChange={changeHandler}
			plugins={[
				directivesPlugin({
					directiveDescriptors: [AdmonitionDirectiveDescriptor],
				}),
				toolbarPlugin({
					toolbarContents: () => (
						<>
							<KitchenSinkToolbar />
						</>
					),
				}),
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				linkPlugin(),
				linkDialogPlugin(),
				frontmatterPlugin(),
				tablePlugin(),
				imagePlugin(),
				diffSourcePlugin(),
				codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
				codeMirrorPlugin({
					codeBlockLanguages: { jsx: "JavaScript", css: "CSS", txt: "Text", html: "HTML", tsx: "TypeScript", python: "Python" },
				})
			]}
		// @ts-ignore
		//translation={(key, defaultValue, interpolations) => {return t(key, defaultValue, interpolations)}}
		/>
	);
};

export default CustomMDXEditor;

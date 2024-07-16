import "@/app/styles/mdx-editor.css";

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
import type { FC, MutableRefObject } from "react";
import "@mdxeditor/editor/style.css";

interface EditorProps {
	markdown: string;
	editorRef?: MutableRefObject<MDXEditorMethods | null>;
}

const CustomMDXEditor: FC<EditorProps> = ({ markdown, editorRef }) => {
	return (
		<MDXEditor
			className="dark-theme dark-editor dark-editor-custom"
			ref={editorRef}
			markdown={markdown}
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
				}),
			]}
		/>
	);
};

export default CustomMDXEditor;

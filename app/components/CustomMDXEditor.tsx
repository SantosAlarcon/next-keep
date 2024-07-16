import "@/app/styles/mdx-editor.css"

import {
	AdmonitionDirectiveDescriptor,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	CreateLink,
	DiffSourceToggleWrapper,
	InsertAdmonition,
	InsertCodeBlock,
	InsertFrontmatter,
	InsertImage,
	InsertTable,
	ListsToggle,
	MDXEditor,
	type MDXEditorMethods,
	UndoRedo,
	diffSourcePlugin,
	directivesPlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
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
							<DiffSourceToggleWrapper>
								<UndoRedo />
								<BoldItalicUnderlineToggles />
								<BlockTypeSelect />
								<ListsToggle />
								<CreateLink />
								<InsertTable />
								<InsertImage />
								<InsertAdmonition />
								<InsertFrontmatter />
								<InsertCodeBlock />
							</DiffSourceToggleWrapper>
						</>
					),
				}),
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				linkPlugin(),
				frontmatterPlugin(),
				tablePlugin(),
				imagePlugin(),
				diffSourcePlugin(),
			]}
		/>
	);
};

export default CustomMDXEditor;

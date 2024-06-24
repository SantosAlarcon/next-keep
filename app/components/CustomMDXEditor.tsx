import { BlockTypeSelect, BoldItalicUnderlineToggles, headingsPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, type MDXEditorMethods, quotePlugin, thematicBreakPlugin, toolbarPlugin, UndoRedo } from '@mdxeditor/editor'
import type { FC, MutableRefObject } from 'react'

interface EditorProps {
    markdown: string;
    editorRef?: MutableRefObject<MDXEditorMethods | null>;
}

const CustomMDXEditor: FC<EditorProps> = ({markdown, editorRef}) => {
  return (
    <MDXEditor ref={editorRef} markdown={markdown} plugins={[
            toolbarPlugin({
                toolbarContents: () => (
                <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <BlockTypeSelect />
                </>
                )
            }),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin()
        ]} />
  )
}

export default CustomMDXEditor

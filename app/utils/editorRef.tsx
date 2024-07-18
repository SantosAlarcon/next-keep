"use client"

import type { MutableRefObject } from "react";
import type { MDXEditorMethods } from "@mdxeditor/editor";

export const editorRef: MutableRefObject<MDXEditorMethods | null> = {
	current: null
}

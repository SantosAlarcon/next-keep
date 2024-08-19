"use client"

import type { MutableRefObject } from "react";
import type { MarkdownEditorRef } from "@uiw/react-markdown-editor";

export const editorRef: MutableRefObject<MarkdownEditorRef | null> = {
	current: null
}

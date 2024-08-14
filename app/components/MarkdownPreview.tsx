"use client"
import "@/styles/wmd-preview.css"

import ReactMarkdownPreview from "@uiw/react-markdown-preview"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import remarkHtml from "remark-html"

const MarkdownPreview = ({text}: {text: string}) => {
  return (
    <ReactMarkdownPreview rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm, remarkHtml]} source={text} />
  )
}

export default MarkdownPreview

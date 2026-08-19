"use client";
import "@/styles/wmd-preview.css";

import ReactMarkdownPreview from "@uiw/react-markdown-preview";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MarkdownPreview = ({ text }: { text: string }) => {
	return (
		<ReactMarkdownPreview
			rehypePlugins={[rehypeHighlight, rehypeSanitize]}
			remarkPlugins={[remarkGfm]}
			source={text}
		/>
	);
};

export default MarkdownPreview;

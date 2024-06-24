"use client";

import React, { Suspense, useRef, useState } from "react";
import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import type { Note } from "@/app/types";
import "@mdxeditor/editor/style.css";
import CustomMDXEditor from "@/app/components/CustomMDXEditor";
import dynamic from "next/dynamic";

const EditorComp = dynamic(() => import("@/app/components/CustomMDXEditor"), { ssr: false });

const NewNotePage = () => {
	const [newNote, setNewNote] = useState<Note>({
		isFixated: false,
		id: crypto.randomUUID(),
		group: null,
		title: "",
		publishedDate: new Date(),
		updatedDate: new Date(),
		data: "",
	});

	const titleRef = useRef<HTMLInputElement>(null);
	const dataRef = useRef(null);

	return (
		<main className={NewNotePageStyles.new__note__page__container}>
			<section className={NewNotePageStyles.new__note__page__section}>
				<input
					className={NewNotePageStyles.new__note__page__title}
					type="text"
					ref={titleRef}
					id="title"
					aria-label="Title"
					placeholder="Title"
				/>
				<Suspense fallback={null}>
					<EditorComp editorRef={dataRef} markdown={newNote.data} />
				</Suspense>
			</section>
		</main>
	);
};

export default NewNotePage;

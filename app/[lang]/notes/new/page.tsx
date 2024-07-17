"use client";

import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import type { Note } from "@/app/types";
import React, { Suspense, useRef, useState } from "react";
import "@mdxeditor/editor/style.css";
import dynamic from "next/dynamic";
import i18next from "i18next"
import { useTranslation } from "react-i18next";

const EditorComp = dynamic(() => import("@/app/components/CustomMDXEditor"), { ssr: false });

const NewNotePage = ({params: {lang}}: {params: {lang: string}}) => {
    const {t} = useTranslation("common")
    console.log(t("title"))
	const [newNote, setNewNote] = useState<Note>({
		isPinned: false,
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

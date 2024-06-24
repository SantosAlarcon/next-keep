"use client"

import React, { useRef, useState } from 'react'
import NewNotePageStyles from '@/app/styles/NewNotePage.module.css'
import type { Note } from '@/app/types'

const NewNotePage = () => {
	const [newNote, setNewNote] = useState<Note>({
	isFixated: false,
	id: crypto.randomUUID(),
	group: null,
	title: "",
	publishedDate: new Date(),
	updatedDate: new Date(),
	data: "",
    })

	const titleRef = useRef<HTMLInputElement>(null)

	return (
		<main className={NewNotePageStyles.new__note__page__container}>
			<section className={NewNotePageStyles.new__note__page__section}>
			    <input className={NewNotePageStyles.new__note__page__title} type="text" ref={titleRef} id="title" aria-label="Title" placeholder="Title" />
			    <div className={NewNotePageStyles.new__note__page__field} suppressContentEditableWarning aria-label="Data" id="data" contentEditable onInput={(e) => setNewNote({ ...newNote, data: e.target.innerText })}></div>
			</section>
		</main>
	)
}

export default NewNotePage

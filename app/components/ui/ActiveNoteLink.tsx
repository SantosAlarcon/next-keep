"use client"

import Link from 'next/link'
import React from 'react'
import noteStyles from "@/app/styles/NoteList.module.css"

const ActiveNoteLink = ({ href, selected, children, title }: { href: string, selected: boolean, title: string, children: React.ReactNode }) => {

	return (
		<Link href={href} title={title} className={`${noteStyles.note__item__container} ${ selected ? noteStyles.note__item__selected : ""}`}>
			{children}
		</Link>

	)
}

export default ActiveNoteLink

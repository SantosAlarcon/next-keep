"use client"

import Link from 'next/link'
import noteStyles from "@/app/styles/NoteList.module.css"
import type { ReactNode } from 'react'

const ActiveNoteLink = ({ href, selected, children }: { href: string, selected: boolean, children: ReactNode }) => {

	return (
		<Link href={href} className={`${noteStyles.note__item__container} ${ selected ? noteStyles.note__item__selected : ""}`}>
			{children}
		</Link>

	)
}

export default ActiveNoteLink

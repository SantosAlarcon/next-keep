import { getNoteById } from '@/app/utils/notes/getNoteById'
import React, { ReactNode } from 'react'

export const generateMetadata = ({ params: { note } }: { params: { note: string } }) => {
	const foundNote = getNoteById(note)
	return {
		title: `${foundNote?.title} - Next Keep`,
	}
}

const AllNoteIdLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>{children}</>
	)
}

export default AllNoteIdLayout

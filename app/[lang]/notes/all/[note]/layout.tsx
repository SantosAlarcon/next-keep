import { getNoteById } from '@/app/utils/database/notes/getNoteById'
import React, { ReactNode } from 'react'

export const generateMetadata = async ({ params: { note } }: { params: { note: string } }) => {
	const foundNote = await getNoteById(note)
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

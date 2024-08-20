import { getNoteById } from '@/app/utils/notes/getNoteById'
import React, { ReactNode } from 'react'

export const generateMetadata = async ({ params: { note } }: { params: { note: string } }) => {
	const foundNote = await getNoteById(note)
	return {
		title: `${foundNote?.title} - Next Keep`,
	}
}

const PinnedNoteIdLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>{children}</>
	)
}

export default PinnedNoteIdLayout

import NoteList from '@/app/components/NoteList';
import { getNoteById } from '@/app/utils/getNoteById';
import React from 'react'
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import allNotesPageStyles from '@/app/styles/AllNotesPage.module.css';
import styles from '@/app/styles/NotePage.module.css';

const PinnedNoteIdPage = ({params: {note}}: {params: {note: string}}) => {
	const foundNote = getNoteById(note);
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList group="pinned" selected={note} />
			<Markdown className={styles.note__page__markdown} remarkPlugins={[remarkGfm]}>{foundNote?.data}</Markdown>
		</main>
	)
}

export default PinnedNoteIdPage

import NoteList from '@/app/components/NoteList';
import NoteHeader from '@/app/components/ui/NoteHeader';
import allNotesPageStyles from '@/app/styles/AllNotesPage.module.css';
import styles from '@/app/styles/NotePage.module.css';
import { getNoteById } from '@/app/utils/database/notes/getNoteById';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const PinnedNoteIdPage = async ({params: {note, lang}}: {params: {note: string, lang: string}}) => {
	const foundNote = await getNoteById(note);
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList group="pinned" selected={note} />
			<div className={allNotesPageStyles.all__notes__page__right}>
				{/** @ts-ignore */}
			    <NoteHeader note={foundNote} lang={lang} />
			    <Markdown className={styles.note__page__markdown} rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm, remarkHtml]}>{foundNote?.data}</Markdown>			
			</div>
		</main>

	)
}

export default PinnedNoteIdPage

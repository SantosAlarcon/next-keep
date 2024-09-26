import NoteHeader from '@/app/components/ui/NoteHeader';
import allNotesPageStyles from '@/app/styles/AllNotesPage.module.css';
import { getNoteById } from '@/app/utils/notes/getNoteById';
import dynamic from 'next/dynamic';

const PinnedNoteIdPage = async ({params: {note, lang}}: {params: {note: string, lang: string}}) => {
	const foundNote = await getNoteById(note);

    const MarkPreview = dynamic(() => import("@/components/MarkdownPreview").then((mod) => mod.default), {ssr: false})

	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<section className={allNotesPageStyles.all__notes__page__right}>
				{/** @ts-ignore */}
			    <NoteHeader note={foundNote} lang={lang} />
                <div className={allNotesPageStyles.all__notes__page__bottom}>
                    {/** @ts-ignore */}
                    <MarkPreview text={foundNote?.data} />
                </div>
			</section>
		</main>

	)
}

export default PinnedNoteIdPage

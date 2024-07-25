import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/app/styles/NotePage.module.css"
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css"
import NoteList from "@/app/components/NoteList";
import remarkHtml from "remark-html";
import rehypeHighlight from "rehype-highlight";
import NoteHeader from "@/app/components/ui/NoteHeader";
import type {Note} from "@/app/types";

const AllNotesPageIdPage = async ({ params: { note, lang } }: { params: { note: string, lang: string } }) => {
	// @ts-ignore
	const foundNote: Note = await getNoteById(note);
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList group="all" selected={note} />
			<div className={allNotesPageStyles.all__notes__page__right}>
			    <NoteHeader note={foundNote} lang={lang} />
			    <Markdown className={styles.note__page__markdown} rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm, remarkHtml]}>{foundNote?.data}</Markdown>			
			</div>
		</main>
	)
};

export default AllNotesPageIdPage;

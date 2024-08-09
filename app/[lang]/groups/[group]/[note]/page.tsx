import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css";
import Markdown from "react-markdown";
import styles from "@/app/styles/NotePage.module.css";
import NoteList from "@/app/components/NoteList";
import NoteHeader from "@/app/components/ui/NoteHeader";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const GroupNotePage = async ({ params: { group, note, lang } }: { params: { group: string; note: string; lang: string } }) => {
	const foundNote = await getNoteById(note);
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList group={group} selected={note} />
			<div className={allNotesPageStyles.all__notes__page__right}>
				{/** @ts-ignore */}
				<NoteHeader note={foundNote} lang={lang} />
				<Markdown className={styles.note__page__markdown} rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm, remarkHtml]}>
					{foundNote?.data}
				</Markdown>
			</div>
		</main>
	);
};

export default GroupNotePage;

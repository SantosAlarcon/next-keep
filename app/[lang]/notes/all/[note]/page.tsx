import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/app/styles/NotePage.module.css"
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css"
import NoteList from "@/app/components/NoteList";
import remarkHtml from "remark-html";
import rehypeHighlight from "rehype-highlight";

const AllNotesPageIdPage = async ({ params: { note } }: { params: { note: string } }) => {
	const foundNote = await getNoteById(note);
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList group="all" selected={note} />
			<Markdown className={styles.note__page__markdown} rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm, remarkHtml]}>{foundNote?.data}</Markdown>
		</main>
	)
};

export default AllNotesPageIdPage;

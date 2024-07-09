import { getNoteById } from "@/app/utils/getNoteById";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/app/styles/NotePage.module.css"

const AllNotesPageId = ({ params: { note } }: { params: { note: string } }) => {
    const foundNote = getNoteById(note);
    return (
        <main>
            <Markdown className={styles.note__page__markdown} remarkPlugins={[remarkGfm]}>{foundNote?.data}</Markdown>
        </main>
    )
};

export default AllNotesPageId;

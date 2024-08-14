import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css";
import NoteList from "@/app/components/NoteList";
import NoteHeader from "@/app/components/ui/NoteHeader";
import dynamic from "next/dynamic";

const GroupNotePage = async ({ params: { group, note, lang } }: { params: { group: string; note: string; lang: string } }) => {
	const foundNote = await getNoteById(note);
    const MarkPreview = dynamic(() => import("@/components/MarkdownPreview").then((mod) => mod.default), {ssr: false})

	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList group={group} selected={note} />
			<div className={allNotesPageStyles.all__notes__page__right}>
				{/** @ts-ignore */}
				<NoteHeader note={foundNote} lang={lang} />
                {/** @ts-ignore */}
                <MarkPreview text={foundNote?.data} />
			</div>
		</main>
	);
};

export default GroupNotePage;

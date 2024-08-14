import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css"
import NoteList from "@/app/components/NoteList";
import NoteHeader from "@/app/components/ui/NoteHeader";
import type {Note} from "@/app/types";
import dynamic from "next/dynamic";

const AllNotesPageIdPage = async ({ params: { note, lang } }: { params: { note: string, lang: string } }) => {
	// @ts-ignore
	const foundNote: Note = await getNoteById(note);

    const MarkPreview = dynamic(() => import("@/components/MarkdownPreview").then((mod) => mod.default), {ssr: false})

	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList group="all" selected={note} />
			<section className={allNotesPageStyles.all__notes__page__right}>
			    <NoteHeader note={foundNote} lang={lang} />
                <div className={allNotesPageStyles.all__notes__page__bottom}>
                    <MarkPreview text={foundNote?.data} />
                </div>
			</section>
		</main>
	)
};

export default AllNotesPageIdPage;

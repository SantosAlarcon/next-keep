import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css"
import NoteHeader from "@/app/components/ui/NoteHeader";
import type { Note } from "@/app/types";
import { getNoteById } from "@/app/utils/notes/getNoteById";
import dynamic from "next/dynamic";

const AllNotesPageIdPage = async ({ params }: { params: Promise<{ note: string, lang: string }> }) => {
	const { note, lang } = await params;
	const foundNote: Note = await getNoteById(note);

	const MarkPreview = dynamic(() => import("@/components/MarkdownPreview").then((mod) => mod.default))

	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
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

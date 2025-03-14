import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css";
import NoteHeader from "@/app/components/ui/NoteHeader";
import dynamic from "next/dynamic";
import { getNoteById } from "@/app/utils/notes/getNoteById";

const GroupNotePage = async ({ params }: { params: Promise<{ note: string; lang: string }> }) => {
	const { note, lang } = await params;
	const foundNote = await getNoteById(note);
	const MarkPreview = dynamic(() => import("@/components/MarkdownPreview").then((mod) => mod.default));

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
	);
};

export default GroupNotePage;

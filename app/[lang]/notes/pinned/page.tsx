import FilterComponent from "@/app/components/FilterComponent";
import NoteList from "@/app/components/NoteList";
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css";

const AllNotesPage = async ({ params }: { params: Promise<{ lang: string }> }) => {
	const { lang } = await params;
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<FilterComponent lang={lang} />
			<NoteList selected="pinned" group="pinned" lang={lang} />
		</main>
	);
};

export default AllNotesPage;

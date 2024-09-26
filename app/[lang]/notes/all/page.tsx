import FilterComponent from "@/app/components/FilterComponent";
import NoteList from "@/app/components/NoteList";
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css";

const AllNotesPage = ({ params: { lang } }: { params: { lang: string } }) => {
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<FilterComponent lang={lang} />
			<NoteList selected="all" group="all" lang={lang} />
		</main>
	);
};

export default AllNotesPage;

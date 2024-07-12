import NoteList from "@/app/components/NoteList";
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css";

const AllNotesPage = () => {
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<NoteList selected={"all"} group="all" />
		</main>
	);
};

export default AllNotesPage;

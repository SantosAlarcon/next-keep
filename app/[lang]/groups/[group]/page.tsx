import FilterComponent from "@/app/components/FilterComponent";
import NoteList from "@/app/components/NoteList";
import allNotesPageStyles from "@/styles/AllNotesPage.module.css"

const GroupPage = ({ params: { lang, group } }: { params: { lang: string; group: string } }) => {
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<FilterComponent lang={lang} />
			<NoteList selected={"group"} group={group} lang={lang} />
		</main>
	);
};

export default GroupPage;

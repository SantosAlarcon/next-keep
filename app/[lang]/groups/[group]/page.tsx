import FilterComponent from "@/app/components/FilterComponent";
import NoteList from "@/app/components/NoteList";
import allNotesPageStyles from "@/styles/AllNotesPage.module.css"

const GroupPage = async ({ params }: { params: Promise<{ lang: string; group: string }> }) => {
	const { lang, group } = await params;
	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
			<FilterComponent lang={lang} />
			<NoteList selected={"group"} group={group} lang={lang} />
		</main>
	);
};

export default GroupPage;

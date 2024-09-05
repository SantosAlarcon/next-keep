import FilterComponent from "@/app/components/FilterComponent";
import NoteList from "@/app/components/NoteList";

const GroupPage = ({ params: { lang, group } }: { params: { lang: string; group: string } }) => {
	return (
		<main>
			<FilterComponent lang={lang} />
			<NoteList selected={"group"} group={group} lang={lang} />
		</main>
	);
};

export default GroupPage;

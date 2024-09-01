import FilterComponent from "@/app/components/FilterComponent";
import NoteList from "@/app/components/NoteList";
import { dataStore } from "@/app/store/dataStore";
import allNotesPageStyles from "@/app/styles/AllNotesPage.module.css";

const AllNotesPage = ({params: {lang}}:{params: {lang: string}}) => {
    // @ts-ignore
    const filter = dataStore.getState().filter

	return (
		<main className={allNotesPageStyles.all__notes__page__container}>
            <FilterComponent lang={lang} />
			<NoteList selected={"all"} group="all" filter={filter} />
		</main>
	);
};

export default AllNotesPage;

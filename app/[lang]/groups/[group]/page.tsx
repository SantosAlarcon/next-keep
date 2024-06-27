import NoteList from "@/app/components/NoteList";

const GroupPage = ({ params: { group } }: { params: { group: string } }) => {
	console.log(group)
	return (
		<main>
			<NoteList group={group} />
		</main>
	);
};

export default GroupPage;

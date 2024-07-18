import NoteList from "@/app/components/NoteList";

const GroupPage = ({ params: { group } }: { params: { group: string } }) => {

	return (
        <>
            <main>
                <NoteList selected={"group"} group={group} />
            </main>
        </>
	)
};

export default GroupPage;

import NoteListStyles from "@/app/styles/NoteList.module.css"
import { getAllNotes } from '../utils/database/notes/getAllNotes';
import { getAllPinnedNotes } from '../utils/database/notes/getAllPinnedNotes';
import { getNotesByGroup } from '../utils/database/notes/getNotesByGroup';
import FixedIcon from './icons/FixedIcon';
import UnfixedIcon from './icons/UnfixedIcon';
import ActiveNoteLink from "./ui/ActiveNoteLink";

const NoteList = async ({ group, selected }: { group: string, selected: string }) => {
	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let notes;

	let path: string = "";

	switch (group) {
		case "all": 
			notes = await getAllNotes();
			path = "/notes/all";
			break;
		case "pinned":
			notes = await getAllPinnedNotes();
			path = "/notes/pinned";
			break;
		default:
			notes = await getNotesByGroup(group);
			path = `/groups/${group}`
			break;
	}

	notes?.sort((a, b) => b.updatedDate.localeCompare(a.updatedDate))

	if (!notes) return null;

	return (
		<ul className={NoteListStyles.note__list__container}>
			{
				notes.map((note) => (
					<ActiveNoteLink selected={selected === note.id} href={`${path}/${note.id}`} key={note.id} title={note.title}>
						<li key={note.id} className={NoteListStyles.note__item__container}>
							<span className={NoteListStyles.note__item__title}>{note.title}</span>
							<span className={NoteListStyles.note__item__pinned}>{note.isPinned ? <FixedIcon /> : <UnfixedIcon />}</span>
						</li>
					</ActiveNoteLink>
				))
			}
		</ul>
	)
}

export default NoteList

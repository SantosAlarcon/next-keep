import NoteListStyles from "@/app/styles/NoteList.module.css"
import Link from 'next/link';
import { getAllNotes } from '../utils/getAllNotes';
import { getAllPinnedNotes } from '../utils/getAllPinnedNotes';
import { getNotesByGroup } from '../utils/getNotesByGroup';
import FixedIcon from './icons/FixedIcon';
import UnfixedIcon from './icons/UnfixedIcon';
import { headers } from "next/headers";

const NoteList = ({ group }: { group: string }) => {
	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let notes;

    const headerss = headers()
    const path = headerss.get("x-current-path")

	switch (group) {
		case "all":
			notes = getAllNotes();
			break;
		case "pinned":
			notes = getAllPinnedNotes();
			break;
		default:
			notes = getNotesByGroup(group);
			break;
	}

    notes.sort((a,b) => a.date.localeCompare(b.date))

	if (!notes) return null;

	return (
		<ul className={NoteListStyles.note__list__container}>
			{
				notes.map((note) => (
					<Link href={`${path}/${note.id}`} key={note.id} title={note.title}>
						<li key={note.id} className={NoteListStyles.note__item__container}>
							<span className={NoteListStyles.note__item__title}>{note.title}</span>
							<span className={NoteListStyles.note__item__pinned}>{note.isPinned ? <FixedIcon /> : <UnfixedIcon />}</span>
						</li>
					</Link>
				))
			}
		</ul>
	)
}

export default NoteList

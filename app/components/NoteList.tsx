import { getNotesByGroup } from '../utils/getNotesByGroup';
import type { Note } from '../types';
import NoteListStyles from "@/app/styles/NoteList.module.css"
import FixedIcon from './icons/FixedIcon';
import UnfixedIcon from './icons/UnfixedIcon';
import Link from 'next/link';
import { getAllNotes } from '../utils/getAllNotes';

const NoteList = ({group}: {group: string}) => {
    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let notes;

    switch(group) {
        case "all":
            notes = getAllNotes();
            break;
        default:
            notes = getNotesByGroup(group);
            break;
    }

    if (!notes) return null;

  return (
    <ul className={NoteListStyles.note__list__container}>
		{
			notes.map((note: Note) => (
				<Link href={`/notes/${note.id}`} key={note.id} title={note.title}>
				    <li key={note.id} className={NoteListStyles.note__item__container}>
					    <span className={NoteListStyles.note__item__title}>{note.title}</span>
					    <span className={NoteListStyles.note__item__fixated}>{note.isFixated ? <FixedIcon /> : <UnfixedIcon />}</span>
				    </li>
				</Link>
			))
		}
    </ul>
  )
}

export default NoteList

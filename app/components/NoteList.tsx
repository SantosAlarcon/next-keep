import React from 'react'
import { getNotesByGroup } from '../utils/getNotesByGroup';
import { Note } from '../types';
import NoteListStyles from "@/app/styles/NoteList.module.css"
import FixedIcon from './icons/FixedIcon';
import UnfixedIcon from './icons/UnfixedIcon';
import Link from 'next/link';

const NoteList = ({group}: {group: string}) => {
    const notes = getNotesByGroup(group);

    if (!notes) return null;

  return (
    <ul className={NoteListStyles.note__list__container}>
		{
			notes.map((note: Note) => (
				<Link href={`/notes/${note.id}`} key={note.id}>
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

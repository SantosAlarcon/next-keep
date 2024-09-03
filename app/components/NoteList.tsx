"use client";

import NoteListStyles from "@/app/styles/NoteList.module.css";
import { getAllNotes } from "../utils/notes/getAllNotes";
import { getAllPinnedNotes } from "../utils/notes/getAllPinnedNotes";
import { getNotesByGroup } from "../utils/notes/getNotesByGroup";
import FixedIcon from "./icons/FixedIcon";
import UnfixedIcon from "./icons/UnfixedIcon";
import ActiveNoteLink from "./ui/ActiveNoteLink";
import { useEffect, useState } from "react";
import type { Note } from "../types";
import { dataStore } from "../store/dataStore";

const NoteList = ({ group, selected }: { group: string; selected: string; }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
	const filter: string = dataStore((state) => state.filter);

	let path: string = "";

	useEffect(() => {
		switch (group) {
			case "all": {
				getAllNotes().then((data) => {
					setNotes(data);
					setFilteredNotes(data);
				});
				path = "/notes/all";
				break;
			}
			case "pinned": {
				getAllPinnedNotes().then((data) => {
					setNotes(data);
					setFilteredNotes(data);
				});
				path = "/notes/pinned";
				break;
			}
			default: {
				getNotesByGroup(group).then((data: Note[]) => {
					setNotes(data);
					setFilteredNotes(data);
				});
				path = `/groups/${group}`;
				break;
			}
		}
	}, []);

	useEffect(() => {
		if (filter.length > 0) {
			setFilteredNotes([...notes].filter((note) => note.title.includes(filter)))
		} else {
			setFilteredNotes(notes)
		}
	}, [filter])

	filteredNotes?.sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));

	return (
		<ul className={NoteListStyles.note__list__container}>
			{filteredNotes.map((note) => (
				<li
					key={note.id}
					className={`${NoteListStyles.note__item__container} ${selected === note.id ? NoteListStyles.note__item__selected : ""}`}
				>
					<ActiveNoteLink selected={selected === note.id} href={`${path}/${note.id}`} key={note.id}>
						<span className={NoteListStyles.note__item__title}>{note.title}</span>
						<span className={NoteListStyles.note__item__pinned}>
							{note.isPinned ? <FixedIcon width="20px" height="20px" /> : <UnfixedIcon width="20px" height="20px" />}
						</span>
					</ActiveNoteLink>
				</li>
			))}
		</ul>
	);
};

export default NoteList;

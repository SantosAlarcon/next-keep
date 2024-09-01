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

const NoteList = ({ group, selected, filter }: { group: string; selected: string; filter: string }) => {
	const [notes, setNotes] = useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

	let path: string = "";

	useEffect(() => {
		switch (group) {
			case "all": {
				getAllNotes().then((data) => setNotes(data));
				path = "/notes/all";
				break;
			}
			case "pinned": {
				getAllPinnedNotes().then((data) => setNotes(data));
				path = "/notes/pinned";
				break;
			}
			default: {
				getNotesByGroup(group).then((data) => setNotes(data));
				path = `/groups/${group}`;
				break;
			}
		}
	}, []);

    useEffect(() => {
        console.log(filter)
        if (filter !== "") {
            setFilteredNotes([...notes].filter((note) => note.title.includes(filter)))
        }
    }, [filter])

	filteredNotes?.sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));

	if (!filteredNotes) return null;

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

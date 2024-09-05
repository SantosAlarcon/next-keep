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
import { useTranslation } from "react-i18next";

const NoteList = ({ group, selected, lang}: { group: string; selected: string; lang: string}) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [path, setPath] = useState<string>("");
	const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const {t} = useTranslation("common", {lng: lang})
    // @ts-ignore
	const filter: string = dataStore((state) => state.filter);

	useEffect(() => {
		switch (group) {
			case "all": {
				getAllNotes().then((data) => {
					setNotes(data);
					setFilteredNotes(data);
					setPath("/notes/all");
				});
				break;
			}
			case "pinned": {
				getAllPinnedNotes().then((data) => {
					setNotes(data);
					setFilteredNotes(data);
					setPath("/notes/pinned");
				});
				break;
			}
			default: {
				getNotesByGroup(group).then((data: Note[]) => {
					setNotes(data);
					setFilteredNotes(data);
					setPath(`/groups/${group}`);
				});
				break;
			}
		}
	}, []);

	useEffect(() => {
		if (filter.length > 0) {
			setFilteredNotes([...notes].filter((note) => note.title.toLowerCase().includes(filter)))
		} else {
			setFilteredNotes(notes)
		}
	}, [filter])

	filteredNotes?.sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));

	return (
		<ul className={NoteListStyles.note__list__container}>
			{filteredNotes.length > 0 ? filteredNotes.map((note) => (
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
			)) : <h3>{notes.length > 0 ? t("no-results-found") : t("note-list-empty")}</h3>}
		</ul>
	);
};

export default NoteList;

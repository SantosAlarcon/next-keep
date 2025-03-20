"use client";

import NoteListStyles from "@/app/styles/NoteList.module.css";
import FixedIcon from "./icons/FixedIcon";
import UnfixedIcon from "./icons/UnfixedIcon";
import ActiveNoteLink from "./ui/ActiveNoteLink";
import { useEffect, useState } from "react";
import type { Note } from "../types";
import { dataStore } from "../store/dataStore";
import { useTranslation } from "react-i18next";

const NoteList = ({ group, selected, lang }: { group: string; selected: string; lang: string }) => {
	// @ts-ignore
	const { allNotes } = dataStore.getState();
	const [path, setPath] = useState<string>("");
	const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
	const { t } = useTranslation("common", { lng: lang });
	// @ts-ignore
	const filter: string = dataStore((state) => state.filter);

	useEffect(() => {
		switch (group) {
			case "all": {
				setFilteredNotes(allNotes);
				setPath("/notes/all");
				break;
			}
			case "pinned": {
				const pinnedNotes = allNotes.filter((note: Note) => note.isPinned === true);
				setFilteredNotes(pinnedNotes);
				setPath("/notes/pinned");
				break;
			}
			default: {
				const groupNotes = allNotes.filter((note: Note) => note.group === group);
				setFilteredNotes(groupNotes);
				setPath(`/groups/${group}`);
				break;
			}
		}


	}, [allNotes, filter]);

	useEffect(() => {
		if (filter.length > 0) {
			setFilteredNotes([...allNotes].filter((note) => note.title.toLowerCase().includes(filter)));
		} else {
			switch (group) {
				case "all": {
					setFilteredNotes(allNotes);
					break;
				}

				case "pinned": {
					const pinnedNotes = allNotes.filter((note: Note) => note.isPinned === true);
					setFilteredNotes(pinnedNotes);
					break;
				}

				default: {
					const groupNotes = allNotes.filter((note: Note) => note.group === group);
					setFilteredNotes(groupNotes);
					break;
				}
			}
		}
	}, [filter]);

	filteredNotes?.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));

	if (!allNotes && !filteredNotes) return null;

	return (
		<ul className={NoteListStyles.note__list__container}>
			{allNotes.length > 0 && filteredNotes.length > 0 ? (
				filteredNotes.map((note) => (
					<li
						key={note.$id}
						className={`${NoteListStyles.note__item__container} ${selected === note.$id ? NoteListStyles.note__item__selected : ""}`}
					>
						<ActiveNoteLink selected={selected === note.$id} href={`${path}/${note.$id}`} key={note.$id} title={note.title}>
							<span className={NoteListStyles.note__item__title}>{note.title}</span>
							<span className={NoteListStyles.note__item__pinned}>
								{note.isPinned ? <FixedIcon width="20px" height="20px" /> : <UnfixedIcon width="20px" height="20px" />}
							</span>
						</ActiveNoteLink>
					</li>
				))
			) : (
				<h3>
					{
						allNotes.length === 0
							? t("note-list-empty")
							: (filteredNotes.length === 0) && (filter === "" && ( selected === "pinned" || selected === "group" ))
								? t("empty-note-list-group")
								: t("no-results-found")
					}
				</h3>
			)}
		</ul>
	);
};

export default NoteList;

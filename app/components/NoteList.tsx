"use client";

import NoteListStyles from "@/app/styles/NoteList.module.css";
import FixedIcon from "./icons/FixedIcon";
import UnfixedIcon from "./icons/UnfixedIcon";
import ActiveNoteLink from "./ui/ActiveNoteLink";
import { useMemo } from "react";
import type { Note } from "../types";
import { dataStore } from "../store/dataStore";
import { useTranslation } from "react-i18next";
import { getRelativeTime, getMarkdownPreview } from "@/app/utils/relativeTime";
import { useRouter } from "next/navigation";
import { useNewNoteStore } from "@/app/store/newNoteStore";

const NoteList = ({
	group,
	selected,
	lang,
}: {
	group: string;
	selected: string;
	lang: string;
}) => {
	const allNotes: Note[] = dataStore((state: any) => state.allNotes);
	const filter: string = dataStore((state: any) => state.filter);
	const { t } = useTranslation("common", { lng: lang });
	const router = useRouter();
	const reset = useNewNoteStore((state) => state.reset);

	const filteredNotes = useMemo(() => {
		let notes: Note[];

		if (filter.length > 0) {
			const lowerFilter = filter.toLowerCase();
			notes = allNotes.filter((note: Note) =>
				note.title.toLowerCase().includes(lowerFilter) ||
				note.data.toLowerCase().includes(lowerFilter),
			);
		} else {
			switch (group) {
				case "all":
					notes = allNotes;
					break;
				case "pinned":
					notes = allNotes.filter((note: Note) => note.isPinned === true);
					break;
				default:
					notes = allNotes.filter((note: Note) => note.group === group);
					break;
			}
		}

		return [...notes].sort((a, b) =>
			b.lastUpdated.localeCompare(a.lastUpdated),
		);
	}, [allNotes, filter, group]);

	const path = useMemo(() => {
		switch (group) {
			case "all":
				return "/notes/all";
			case "pinned":
				return "/notes/pinned";
			default:
				return `/groups/${group}`;
		}
	}, [group]);

	const handleCreateNote = () => {
		reset();
		router.push(`/${lang}/notes/new`);
	};

	if (!allNotes && !filteredNotes) return null;

	return (
		<ul className={NoteListStyles.note__list__container}>
			{allNotes.length > 0 && filteredNotes.length > 0 ? (
				filteredNotes.map((note) => (
					<li
						key={note.$id}
						className={`${NoteListStyles.note__item__container} ${selected === note.$id ? NoteListStyles.note__item__selected : ""}`}
					>
						<ActiveNoteLink
							selected={selected === note.$id}
							href={`${path}/${note.$id}`}
							key={note.$id}
							title={note.title}
						>
							<span className={NoteListStyles.note__item__content}>
								<span className={NoteListStyles.note__item__title}>
									{note.title}
								</span>
								{note.data && (
									<span className={NoteListStyles.note__item__preview}>
										{getMarkdownPreview(note.data)}
									</span>
								)}
								<span className={NoteListStyles.note__item__time}>
									{getRelativeTime(note.lastUpdated, lang)}
								</span>
							</span>
							<span className={NoteListStyles.note__item__pinned}>
								{note.isPinned ? (
									<FixedIcon width="20px" height="20px" />
								) : (
									<UnfixedIcon width="20px" height="20px" />
								)}
							</span>
						</ActiveNoteLink>
					</li>
				))
			) : (
				<li className={NoteListStyles.note__list__empty} role="status">
					<div className={NoteListStyles.note__empty__illustration}>
						<img
							src="/note.svg"
							alt=""
							width="64"
							height="64"
							aria-hidden="true"
						/>
					</div>
					<p>
						{allNotes.length === 0
							? t("note-list-empty")
							: filteredNotes.length === 0 &&
									filter === "" &&
									(selected === "pinned" || selected === "group")
								? t("empty-note-list-group")
								: t("no-results-found")}
					</p>
					{allNotes.length === 0 && (
						<button
							className={NoteListStyles.note__empty__cta}
							onClick={handleCreateNote}
							type="button"
						>
							{t("create-note")}
						</button>
					)}
				</li>
			)}
		</ul>
	);
};

export default NoteList;

import NoteListStyles from "@/app/styles/NoteList.module.css";
import FixedIcon from "./icons/FixedIcon";
import UnfixedIcon from "./icons/UnfixedIcon";
import ActiveNoteLink from "./ui/ActiveNoteLink";
import { Note } from "../types";
import { getAllNotes } from "../utils/database-appwrite/notes/getAllNotes";
import { getAllPinnedNotes } from "../utils/database-appwrite/notes/getAllPinnedNotes";
import { getNotesByGroup } from "../utils/database-appwrite/notes/getNotesByGroup";

const NoteList = async ({
	group,
	selected,
	filter,
}: {
	group: string;
	selected: string;
	filter: string;
}) => {
	let notes;

	let path: string = "";

	switch (group) {
		case "all": {
			notes = await getAllNotes();
			path = "/notes/all";
			break;
		}
		case "pinned": {
			notes = await getAllPinnedNotes();
			path = "/notes/pinned";
			break;
		}
		default: {
			notes = await getNotesByGroup(group);
			path = `/groups/${group}`;
			break;
		}
	}

    // @ts-ignore
	notes?.sort((a: Note, b: Note) => b.$updatedAt.localeCompare(a.$updatedAt));

	if (!notes) return null;

	return (
		<ul className={NoteListStyles.note__list__container}>
            {/* @ts-ignore */}
			{notes.map((note: Note) => (
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
						<span className={NoteListStyles.note__item__title}>
							{note.title}
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
			))}
		</ul>
	);
};

export default NoteList;

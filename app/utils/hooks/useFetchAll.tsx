import { useEffect, useState } from "react";
import type { Note, Group } from "@/app/types";
import { getAllPinnedNotes } from "../notes/getAllPinnedNotes";
import { getAllGroups } from "../groups/getAllGroups";
import { getAllNotes } from "../notes/getAllNotes";
import { getNoteAmountByGroups } from "../notes/getNoteAmountByGroups";

const useFetchAll = () => {
	const [allNotes, setAllNotes] = useState<Note[]>([]);
	const [allPinnedNotes, setAllPinnedNotes] = useState<Note[]>([]);
	const [allGroups, setAllGroups] = useState<Group[]>([]);
	const [allNoteAmounts, setAllNoteAmounts] = useState([]);

	useEffect(() => {
		Promise.all([getAllNotes(), getAllPinnedNotes(), getAllGroups(), getNoteAmountByGroups()]).then(([notes, pinned, groups, noteAmounts]) => {
			setAllNotes(notes);
			setAllPinnedNotes(pinned);
			setAllGroups(groups);
			// @ts-ignore
			setAllNoteAmounts(noteAmounts)
		});
	}, []);

	return { allNotes, allPinnedNotes, allGroups, allNoteAmounts };
};

export default useFetchAll;

import { useEffect, useState } from "react";
import type { Note, Group } from "@/app/types";
import { getAllPinnedNotes } from "../notes/getAllPinnedNotes";
import { getAllGroups } from "../groups/getAllGroups";
import { getAllNotes } from "../notes/getAllNotes";

const useFetchAll = () => {
	const [allNotes, setAllNotes] = useState<Note[]>([]);
	const [allPinnedNotes, setAllPinnedNotes] = useState<Note[]>([]);
	const [allGroups, setAllGroups] = useState<Group[]>([]);

	useEffect(() => {
		Promise.all([getAllNotes(), getAllPinnedNotes(), getAllGroups()]).then(([notes, pinned, groups]) => {
			setAllNotes(notes);
			setAllPinnedNotes(pinned);
			setAllGroups(groups);
		});
	}, []);

	return { allNotes, allPinnedNotes, allGroups };
};

export default useFetchAll;

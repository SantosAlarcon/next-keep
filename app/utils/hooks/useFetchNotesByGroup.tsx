import type { Note } from "@/app/types";
import { useEffect, useState } from "react";

export function useFetchNotesByGroup(groupId: string) {
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		fetch(`/api/notes?group=${groupId}`).then((res) => res.json()).then((data) => setNotes(data));
	}, [groupId])

	console.log(notes)

	return notes;
}

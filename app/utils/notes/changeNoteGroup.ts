import type { Note } from "@/app/types";

export const changeNoteGroup = async (note: Note, groupTitle: string) => {
	const group = await fetch(`/api/groups?title=${groupTitle}`).then((response) => response.json());

	try {
		await fetch(`/api/notes_appwrite?id=${note.$id}`, {
			method: "PUT",
			body: JSON.stringify({
				title: note.title,
				group: group.id,
			}),
		});
	} catch (error) {
		console.error(error);
	}
};

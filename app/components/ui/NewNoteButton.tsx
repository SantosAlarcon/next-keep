"use client";

import { useRouter } from "next/navigation";
import sidebarStyles from "@/app/styles/sidebar.module.css";
import NewNoteIcon from "../icons/NewNoteIcon";
import { useNewNoteStore } from "@/app/store/newNoteStore";

const NewNoteButton = ({ title, expanded }: { title: string; expanded: boolean }) => {
	const reset = useNewNoteStore.getState().reset;
	reset();

	const router = useRouter();
	const createNewNote = () => {
		router.push("/notes/new");
	};

	return (
		<button data-title={title} data-tooltip-align={expanded ? null : "right"} className={expanded ? sidebarStyles.sidebar__button : sidebarStyles.sidebar__new__note__button__collapsed} onClick={createNewNote} type="button">
			<NewNoteIcon />
			{expanded ? <span>{title}</span> : null}
		</button>
	);
};

export default NewNoteButton;

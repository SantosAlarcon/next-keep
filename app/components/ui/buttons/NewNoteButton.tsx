"use client";

import { useRouter } from "next/navigation";
import sidebarStyles from "@/app/styles/sidebar.module.css";
import NewNoteIcon from "@/app/components/icons/NewNoteIcon";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import { Button } from "primereact/button";

const NewNoteButton = ({ title, expanded }: { title: string; expanded: boolean }) => {
	const reset = useNewNoteStore.getState().reset;
	reset();

	const router = useRouter();
	const createNewNote = () => {
		router.push("/notes/new");
	};

	return (
		<Button
			tooltip={expanded ? undefined : title}
			tooltip-align={expanded ? null : "right"}
			className={expanded ? sidebarStyles.sidebar__button : sidebarStyles.sidebar__new__note__button__collapsed}
			onClick={createNewNote}
			type="button"
		>
			<NewNoteIcon />
			{expanded ? <span>{title}</span> : null}
		</Button>
	);
};

export default NewNoteButton;

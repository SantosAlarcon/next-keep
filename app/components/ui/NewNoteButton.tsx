"use client";

import { useRouter } from "next/navigation";
import sidebarStyles from "@/app/styles/sidebar.module.css";
import NewNoteIcon from "../icons/NewNoteIcon";

const NewNoteButton = ({ title }: { title: string }) => {
	const router = useRouter();
	const createNewNote = () => {
		router.push("/notes/new");
	};

	return (
		<button className={sidebarStyles.sidebar__button} onClick={createNewNote} type="button">
			<NewNoteIcon />
			{title}
		</button>
	);
};

export default NewNoteButton;

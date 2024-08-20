"use client";

import FixedIcon from "../icons/FixedIcon";
import UnfixedIcon from "../icons/UnfixedIcon";
import type { Note } from "@/app/types";
import pinnedButtonStyles from "@/app/styles/PinnedButton.module.css";
import { toggleNotePin } from "@/app/utils/notes/toggleNotePin";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { updateNotes } from "@/app/utils/updateData";

const TogglePinButton = ({ title, note }: { title: string; note: Note }) => {
	const router = useRouter();
	const handleClick = () => {
		toggleNotePin(note);
		updateNotes();
		router.refresh();
	};

	return (
		<Button
			icon={note.isPinned ? <FixedIcon width="20px" height="20px" /> : <UnfixedIcon width="20px" height="20px" />}
			onClick={handleClick}
			tooltip={title}
			tooltipOptions={{ position: "bottom" }}
			type="button"
			className={pinnedButtonStyles.pinned__button__container}
		/>
	);
};

export default TogglePinButton;

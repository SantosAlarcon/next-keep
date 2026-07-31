"use client";

import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import FixedIcon from "@/app/components/icons/FixedIcon";
import UnfixedIcon from "@/app/components/icons/UnfixedIcon";
import type { Note } from "@/app/types";
import { toggleNotePin } from "@/app/utils/notes/toggleNotePin";
import { updateNotes } from "@/app/utils/updateData";
import CustomTooltip from "../CustomTooltip";

const TogglePinButton = ({ note }: { note: Note }) => {
	const { t } = useT("common");
	const router = useRouter();
	const handleClick = () => {
		toggleNotePin(note);
		updateNotes();
		router.refresh();
	};

	return (
		<CustomTooltip
			side="bottom"
			align="center"
			tooltipText={note.isPinned ? t("unpin-note") : t("pin-note")}
			severity="secondary"
			onClick={handleClick}
			as={Button}
		>
			{note.isPinned ? (
				<FixedIcon width="20px" height="20px" />
			) : (
				<UnfixedIcon width="20px" height="20px" />
			)}
		</CustomTooltip>
	);
};

export default TogglePinButton;

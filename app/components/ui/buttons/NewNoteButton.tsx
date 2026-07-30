"use client";

import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import NewNoteIcon from "@/app/components/icons/NewNoteIcon";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import sidebarStyles from "@/app/styles/sidebar.module.css";

const NewNoteButton = ({ expanded }: { expanded: boolean }) => {
	const { t } = useT("common");
	const reset = useNewNoteStore.getState().reset;
	reset();

	const router = useRouter();
	const createNewNote = () => {
		router.push("/notes/new");
	};

	return (
		<Button
			className={
				expanded
					? sidebarStyles.sidebar__button
					: sidebarStyles.sidebar__new__note__button__collapsed
			}
			onClick={createNewNote}
			aria-label={t("create-note")}
			type="button"
		>
			<NewNoteIcon />
			{expanded ? <span>{t("create-note")}</span> : null}
		</Button>
	);
};

export default NewNoteButton;

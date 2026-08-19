"use client";

import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useEffect } from "react";
import NewNoteIcon from "@/app/components/icons/NewNoteIcon";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import sidebarStyles from "@/app/styles/sidebar.module.css";

const NewNoteButton = ({ expanded }: { expanded: boolean }) => {
	const { t } = useT("common");
	const reset = useNewNoteStore.getState().reset;

	useEffect(() => {
		reset();
	}, [reset])

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
			severity="secondary"
			style={{
				minHeight: "fit-content",
			}}
		>
			<NewNoteIcon />
			{expanded && (
				<span className="sidebarStyles.sidebar__new__note__button__label">
					{t("create-note")}
				</span>
			)}
		</Button>
	);
};

export default NewNoteButton;

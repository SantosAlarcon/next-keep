"use client";

import type { Note } from "@/app/types";
import { Button } from "primereact/button";
import { useState } from "react";
import { dataStore } from "@/app/store/dataStore";
import type { DataStoreProps } from "@/app/store/dataStore";
import ChangeGroupDialog from "@/app/components/ui/dialogs/ChangeGroupDialog";

const ChangeGroupButton = ({
	lang,
	label,
	note,
	groupTitle,
}: {
	lang: string;
	label: string;
	note: Note;
	groupTitle: string;
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const allGroupTitles = dataStore(
        // @ts-ignore
		(state: DataStoreProps) => state.allGroupTitles,
	);
	const handleDialog = () => {
		setVisible(true);
	};

	if (!allGroupTitles) {
		return null;
	}

	return (
		<>
			<Button
				aria-label={label}
				onClick={handleDialog}
				icon="pi pi-folder"
				tooltip={label}
				tooltipOptions={{ position: "bottom" }}
			/>
			<ChangeGroupDialog
				lang={lang}
				visible={visible}
				note={note}
				groupTitle={groupTitle}
				groupTitles={allGroupTitles}
				onHide={() => setVisible(false)}
			/>
		</>
	);
};

export default ChangeGroupButton;

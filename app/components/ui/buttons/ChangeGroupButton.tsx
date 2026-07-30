"use client";

import { Folder } from "@primeicons/react/folder";
import { Button } from "@primereact/ui/button";
import { useState } from "react";
import ChangeGroupDialog from "@/app/components/ui/dialogs/ChangeGroupDialog";
import type { DataStoreProps } from "@/app/store/dataStore";
import { dataStore } from "@/app/store/dataStore";
import type { Note } from "@/app/types";
import CustomTooltip from "../CustomTooltip";

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
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const allGroupTitles = dataStore(
		// @ts-ignore
		(state: DataStoreProps) => state.allGroupTitles,
	);
	if (!allGroupTitles) {
		return null;
	}

	return (
		<>
			<CustomTooltip side={"top"} align={"start"} tooltipText={label}>
				<Button aria-label={label} onClick={() => setModalVisible(true)}>
					<Folder />
				</Button>
			</CustomTooltip>
			<ChangeGroupDialog
				lang={lang}
				visible={modalVisible}
				note={note}
				groupTitle={groupTitle}
				groupTitles={allGroupTitles}
				onHide={() => setModalVisible(false)}
			/>
		</>
	);
};

export default ChangeGroupButton;

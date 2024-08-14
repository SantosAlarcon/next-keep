"use client";

import type { Note } from "@/app/types";
import { getAllGroupTitles } from "@/app/utils/groups/getAllGroupTitles";
import useQuery from "@/app/utils/hooks/useQuery";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { changeNoteGroup } from "@/app/utils/notes/changeNoteGroup";

const ChangeGroupButton = ({ label, note, groupTitle, localeStrings: { changeString, selectGroupHeader, selectGroupMessage } }: { label: string; note: Note, groupTitle: string, localeStrings: { changeString: string; selectGroupHeader: string; selectGroupMessage: string } }) => {
	const [visible, setVisible] = useState<boolean>(false);
	const { data } = useQuery(getAllGroupTitles)
	const [selectedGroup, setSelectedGroup] = useState<string>(groupTitle);
	const handleDialog = () => {
		setVisible(true);
	};

	const handleChange = (event: DropdownChangeEvent) => {
		setSelectedGroup(event.value);
	}

	const confirmChange = () => {
		changeNoteGroup(note, selectedGroup);
		setVisible(false);
	}

	if (!data) {
		return null;
	}

	return (
		<>
			<Button onClick={handleDialog} icon="pi pi-folder" tooltip={label} tooltipOptions={{ position: "bottom" }} />
			<Dialog header={selectGroupHeader}
				draggable={false} message={selectGroupMessage}
				visible={visible}
				footer={
					<>
						<Button label={changeString} onClick={confirmChange} />
					</>
				}
				onHide={() => {
					setVisible(false);
					setSelectedGroup(groupTitle);
				}}>
				<p>{selectGroupMessage}</p>
				{/* @ts-ignore */}
				<Dropdown value={selectedGroup} onChange={(e) => handleChange(e)} options={data} />
			</Dialog>
		</>
	);
};

export default ChangeGroupButton;

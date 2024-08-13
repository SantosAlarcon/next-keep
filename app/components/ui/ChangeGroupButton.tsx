"use client";

import { groupStore } from "@/app/store/groupStore";
import type { Note } from "@/app/types";
import { getAllGroupTitles } from "@/app/utils/groups/getAllGroupTitles";
import useStore from "@/app/utils/hooks/useStore";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";

const ChangeGroupButton = ({ label, note }: { label: string; note: Note }) => {
	const [visible, setVisible] = useState<boolean>(false);
    const groups = useStore(groupStore, (state) => state.groupTitles)
	//const [groups, setGroups] = useState<string[]>([]);
	const handleDialog = () => {
		setVisible(true);
	};

	/*useEffect(() => {
		if (!groups) {
			getAllGroupTitles().then((data) => setGroups(data));
		}
	}, []);*/

	return (
		<>
			<Button onClick={handleDialog} icon="pi pi-folder" tooltip={label} tooltipOptions={{ position: "bottom" }} />
			<Dialog header="Change group" visible={visible} onHide={() => setVisible(false)}>
				<p>Select a group from the dropdown:</p>
				<Dropdown options={groups} />
			</Dialog>
		</>
	);
};

export default ChangeGroupButton;

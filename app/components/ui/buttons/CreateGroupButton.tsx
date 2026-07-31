"use client";

import { Plus } from "@primeicons/react/plus";
import { useState } from "react";
import CreateGroupDialog from "@/app/components/ui/dialogs/CreateGroupDialog";
import CustomTooltip from "../CustomTooltip";

const CreateGroupButton = ({ title }: { title: string }) => {
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<>
			<CustomTooltip
				side={"right"}
				align={"center"}
				tooltipText={title}
				onClick={() => setVisible(true)}
				severity="secondary"
			>
				<Plus />
			</CustomTooltip>
			<CreateGroupDialog visible={visible} onHide={() => setVisible(false)} />
		</>
	);
};

export default CreateGroupButton;

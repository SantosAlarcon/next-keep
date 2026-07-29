"use client";

import { Button } from "@primereact/ui/button";
import { useState } from "react";
import CreateGroupDialog from "@/app/components/ui/dialogs/CreateGroupDialog";
import CustomTooltip from "../CustomTooltip";

const CreateGroupButton = ({
	lang,
	title,
}: {
	lang: string;
	title: string;
}) => {
	const [visible, setVisible] = useState<boolean>(false);

	return (
		<>
			<CreateGroupDialog
				lang={lang}
				visible={visible}
				onHide={() => setVisible(false)}
			/>
			<CustomTooltip side={"right"} align={"center"} tooltipText={title}>
				<Button
					aria-label={title}
					onClick={() => setVisible(true)}
					icon="pi pi-plus"
				/>
			</CustomTooltip>
		</>
	);
};

export default CreateGroupButton;

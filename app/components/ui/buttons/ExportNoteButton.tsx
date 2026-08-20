"use client";

import { Download } from "@primeicons/react/download";
import { Button } from "@primereact/ui/button";
import { useT } from "next-i18next/client";
import type { Note } from "@/app/types";
import CustomTooltip from "../CustomTooltip";

const ExportNoteButton = ({ note }: { note: Note }) => {
	const { t } = useT("common");

	const handleExport = () => {
		const blob = new Blob([note.data], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${note.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.md`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<CustomTooltip
			as={Button}
			severity="secondary"
			onClick={handleExport}
			aria-label={t("export-note")} side={"top"} align={"start"} tooltipText={t("export-note")}>
			<Download size={20} />
		</CustomTooltip>
	);
};

export default ExportNoteButton;

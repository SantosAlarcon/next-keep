import { changeNoteGroup } from "@/app/utils/notes/changeNoteGroup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import type { Note } from "@/app/types";
import { toast } from "sonner";
import BarLoader from "../BarLoader";
import { useState } from "react";
import { updateNotes } from "@/app/utils/updateData";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const ChangeGroupDialog = ({
	lang,
	visible,
	note,
	groupTitle,
	onHide,
	groupTitles,
}: { lang: string; visible: boolean; note: Note; groupTitle: string; groupTitles: string[]; onHide: () => void }) => {
	const { t } = useTranslation("common", { lng: lang });
	const [pending, setPending] = useState<boolean>(false);
	const [selectedGroup, setSelectedGroup] = useState<string>(groupTitle);
	const router = useRouter();

	const confirmChange = () => {
		setPending(true);
		changeNoteGroup(note, selectedGroup)
			.then(() => {
				toast.success(t("note.change-group-success", { group: selectedGroup }));
				updateNotes();
				onHide();

				setTimeout(() => {
					router.refresh();
				}, 100);
			})
			.finally(() => {
				setPending(false);
			});
	};

	const handleChange = (event: DropdownChangeEvent) => {
		setSelectedGroup(event.value);
	};

	return (
		<Dialog
			header={t("note.change-group-header")}
			draggable={false}
			resizable={false}
			// @ts-ignore
			message={t("note.change-group-message")}
			visible={visible}
			breakpoints={{ "640px": "80vw" }}
			footer={
				<>
					{/* @ts-ignore */}
					<Button label={pending ? <span className="pi pi-spin pi-spinner" /> : t("change")} onClick={confirmChange} />
				</>
			}
			onHide={() => {
				onHide();
				setSelectedGroup(groupTitle);
			}}
		>
			<div className="p-dialog-content-input">
				<p>{t("note.change-group-message")}</p>
				<Dropdown value={selectedGroup} onChange={(e) => handleChange(e)} options={groupTitles} />
			</div>
		</Dialog>
	);
};

export default ChangeGroupDialog;

import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import type { SelectValueChangeEvent } from "@primereact/ui/select";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { toast } from "sonner";
import type { Note } from "@/app/types";
import { changeNoteGroup } from "@/app/utils/notes/changeNoteGroup";
import { updateNotes } from "@/app/utils/updateData";
import CustomSelect from "../CustomSelect";
import Spinner from "../Spinner";

const ChangeGroupDialog = ({
	visible,
	note,
	groupTitle,
	onHide,
	groupTitles,
}: {
	visible: boolean;
	note: Note;
	groupTitle: string;
	groupTitles: string[];
	onHide: () => void;
}) => {
	const { t } = useT("common");
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
		setPending(false);
		onHide();
	};

	return (
		<Dialog.Root open={visible} draggable={false} dismissable>
			<Dialog.Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Popup>
						<Dialog.Header>
							<span>{t("note.change-group-header")}</span>
						</Dialog.Header>
						<Dialog.Content>
							<div className="p-dialog-content-input">
								<p>{t("note.change-group-message")}</p>
								<CustomSelect
									value={selectedGroup}
									onValueChange={(e: SelectValueChangeEvent) =>
										setSelectedGroup(e.value as string)
									}
									options={groupTitles}
								/>
							</div>
						</Dialog.Content>
						<Dialog.Footer>
							<Dialog.Close
								as={Button}
								severity="secondary"
								pt-root-onClick={onHide}
							>
								{t("cancel")}
							</Dialog.Close>
							<Dialog.Close
								as={Button}
								severity="primary"
								pt-root-onClick={confirmChange}
							>
								{pending ? (
									<Spinner width="16" height="16" color="" />
								) : (
									t("change")
								)}
							</Dialog.Close>
						</Dialog.Footer>
					</Dialog.Popup>
				</Dialog.Positioner>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default ChangeGroupDialog;

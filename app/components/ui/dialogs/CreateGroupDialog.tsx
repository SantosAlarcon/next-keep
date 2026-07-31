import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { InputText } from "@primereact/ui/inputtext";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { toast } from "sonner";
import { createNewGroup } from "@/app/utils/groups/createNewGroup";
import { updateGroups } from "@/app/utils/updateData";
import Spinner from "../Spinner";

const CreateGroupDialog = ({
	visible,
	onHide,
}: {
	visible: boolean;
	onHide: () => void;
}) => {
	const { t } = useT("common");
	const [newGroupTitle, setNewGroupTitle] = useState<string>("");
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();

	const handleCreateGroup = () => {
		if (newGroupTitle === "") {
			toast.error(t("group.ask-for-group-name"), { position: "top-center" });
		} else {
			setPending(true);
			createNewGroup(newGroupTitle)
				.then(() => {
					toast.success(
						t("group.create-group-success", { name: newGroupTitle }),
					);
					onHide();
					updateGroups();

					setTimeout(() => {
						router.refresh();
					}, 50);

					setNewGroupTitle("");
				})
				.finally(() => {
					setPending(false);
				});
		}
	};

	return (
		<Dialog.Root open={visible} draggable={false} dismissable>
			<Dialog.Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Popup>
						<Dialog.Header>
							<div className="">{t("group.create-group-header")}</div>
						</Dialog.Header>
						<Dialog.Content>
							<div className="p-dialog-content-input">
								<p>{t("group.create-group-message")}</p>
								<InputText
									required
									aria-label={t("group.create-group-message")}
									value={newGroupTitle}
									// @ts-ignore
									onChange={(e) => setNewGroupTitle(e.target.value)}
								/>
							</div>
						</Dialog.Content>
						<Dialog.Footer>
							<Dialog.Close
								severity="secondary"
								pt-root-aria-label={t("cancel")}
								pt-root-onClick={() => {
									onHide();
									setNewGroupTitle("");
								}}
								as={Button}
							>
								{t("cancel")}
							</Dialog.Close>
							<Dialog.Close
								severity="primary"
								pt-root-aria-label={t("create")}
								pt-root-onClick={handleCreateGroup}
								as={Button}
							>
								{pending ? (
									<Spinner width="20" height="20" color="" />
								) : (
									t("create")
								)}
							</Dialog.Close>
						</Dialog.Footer>
					</Dialog.Popup>
				</Dialog.Positioner>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default CreateGroupDialog;

import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { InputText } from "@primereact/ui/inputtext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createNewGroup } from "@/app/utils/groups/createNewGroup";
import { updateGroups } from "@/app/utils/updateData";

const CreateGroupDialog = ({
	lang,
	visible,
	onHide,
}: {
	lang: string;
	visible: boolean;
	onHide: () => void;
}) => {
	const { t } = useTranslation("common", { lng: lang });
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
		<Dialog.Root open={visible}>
			<Dialog.Portal>
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
							t{"cancel"}
						</Dialog.Close>
						<Dialog.Close
							severity="primary"
							pt-root-aria-label={t("create")}
							pt-root-onClick={handleCreateGroup}
							as={Button}
						>
							t{"create"}
						</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
		// <Dialog
		// 	footer={
		// 		<>
		// 			<Button
		// 				aria-label={t("cancel")}
		// 				label={t("cancel")}
		// 				onClick={() => {
		// 					onHide();
		// 					setNewGroupTitle("");
		// 				}}
		// 			/>
		// 			{/* @ts-ignore */}
		// 			<Button
		// 				aria-label={
		// 					pending ? <span className="pi pi-spinner pi-spin" /> : t("create")
		// 				}
		// 				onClick={handleCreateGroup}
		// 				label={t("create")}
		// 			/>
		// 		</>
		// 	}
		// 	draggable={false}
		// 	resizable={false}
		// 	blockScroll={true}
		// 	breakpoints={{ "640px": "85vw" }}
		// 	onHide={() => {
		// 		onHide();
		// 		setNewGroupTitle("");
		// 	}}
		// 	visible={visible}
		// >
		// </Dialog>
	);
};

export default CreateGroupDialog;

"use client";

import { Spinner } from "@primeicons/react/spinner";
import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { InputText } from "@primereact/ui/inputtext";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Group } from "@/app/types";
import { updateGroupById } from "@/app/utils/groups/updateGroupById";
import { updateGroups } from "@/app/utils/updateData";

const RenameGroupDialog = ({
	visible,
	onHide,
	group,
}: {
	visible: boolean;
	onHide: () => void;
	group: Group;
}) => {
	const [pending, setPending] = useState<boolean>(false);
	const { t } = useT("common");
	const [newTitle, setNewTitle] = useState<string>(group?.title);
	const titleRef = useRef(() => group.title);

	const router = useRouter();

	useEffect(() => {
		// @ts-ignore
		titleRef.current.value = group?.title;
	}, [group]);

	return (
		<Dialog.Root open={visible} draggable={false} dismissable>
			<Dialog.Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Popup>
						<Dialog.Header>{t("group.group-rename-header")}</Dialog.Header>
						<Dialog.Content>
							<div className="p-dialog-content-input">
								<p>{t("group.group-rename-message")}</p>
								<InputText
									// @ts-ignore
									ref={titleRef}
									required
									aria-label={t("group.group-rename-message")}
									defaultValue={group?.title}
									// @ts-ignore
									onInput={(e) => setNewTitle(e.target.value)}
								/>
							</div>
						</Dialog.Content>
						<Dialog.Footer>
							<Dialog.Close
								as={Button}
								severity="secondary"
								pt-root-onClick={() => {
									onHide();
									setNewTitle("");
								}}
							>
								{t("cancel")}
							</Dialog.Close>
							<Dialog.Close
								as={Button}
								severity="primary"
								pt-root-onClick={() => {
									// @ts-ignore
									if (newTitle === "" || !titleRef.current) {
										toast.error(t("group.ask-for-group-name"), {
											position: "top-center",
										});
									} else {
										// @ts-ignore
										setPending(true);
										updateGroupById(group?.$id, newTitle)
											.then(() => {
												toast.success(
													t("group.group-rename-success", {
														// @ts-ignore
														name: titleRef?.current?.value,
													}),
												);
												updateGroups();
												setPending(true);
												onHide();
												setNewTitle("");
												setTimeout(() => {
													router.refresh();
												}, 50);
											})
											.finally(() => setPending(false));
									}
								}}
							>
								{pending ? <Spinner size={20} /> : t("rename")}
							</Dialog.Close>
						</Dialog.Footer>
					</Dialog.Popup>
				</Dialog.Positioner>
			</Dialog.Portal>
		</Dialog.Root>
		// <Dialog
		// 	header={t("group.group-rename-header")}
		// 	blockScroll={true}
		// 	breakpoints={{ "640px": "85vw" }}
		// 	resizable={false}
		// 	draggable={false}
		// 	onHide={() => {
		// 		onHide();
		// 		setNewTitle("");
		// 	}}
		// 	visible={visible}
		// 	footer={
		// 		<>
		// 			<Button
		// 				aria-label={t("cancel")}
		// 				label={t("cancel")}
		// 				onClick={() => {
		// 					onHide();
		// 					setNewTitle("");
		// 				}}
		// 			/>
		// 			<Button
		// 				// @ts-ignore
		// 				label={
		// 					pending ? (
		// 						<span className="pi pi-spinner pi-spin"></span>
		// 					) : (
		// 						t("rename")
		// 					)
		// 				}
		// 				aria-label={t("rename")}
		// 				onClick={() => {
		// 					// @ts-ignore
		// 					if (newTitle === "" || !titleRef.current) {
		// 						toast.error(t("group.ask-for-group-name"), {
		// 							position: "top-center",
		// 						});
		// 					} else {
		// 						// @ts-ignore
		// 						setPending(true);
		// 						updateGroupById(group?.$id, newTitle)
		// 							.then(() => {
		// 								toast.success(
		// 									t("group.group-rename-success", {
		// 										// @ts-ignore
		// 										name: titleRef?.current?.value,
		// 									}),
		// 								);
		// 								updateGroups();
		// 								setPending(true);
		// 								onHide();
		// 								setNewTitle("");
		// 								setTimeout(() => {
		// 									router.refresh();
		// 								}, 50);
		// 							})
		// 							.finally(() => setPending(false));
		// 					}
		// 				}}
		// 			/>
		// 		</>
		// 	}
		// >
		// </Dialog>
	);
};

export default RenameGroupDialog;

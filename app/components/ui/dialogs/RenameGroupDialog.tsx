"use client";

import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { InputText } from "@primereact/ui/inputtext";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { toast } from "sonner";
import type { Group } from "@/app/types";
import { updateGroupById } from "@/app/utils/groups/updateGroupById";
import { updateGroups } from "@/app/utils/updateData";
import Spinner from "../Spinner";

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

    const router = useRouter();

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
                                    setPending(true);
                                    updateGroupById(group?.$id, newTitle)
                                        .then(() => {
                                            toast.success(
                                                t("group.group-rename-success", {
                                                    // @ts-ignore
                                                    name: newTitle,
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
                                }}
                            >
                                {pending ? (
                                    <Spinner width="20" height="20" color="" />
                                ) : (
                                    t("rename")
                                )}
                            </Dialog.Close>
                        </Dialog.Footer>
                    </Dialog.Popup>
                </Dialog.Positioner>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default RenameGroupDialog;

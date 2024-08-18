"use client"

import i18nClient from "@/app/i18n-client";
import type { Group } from "@/app/types";
import { updateGroupById } from "@/app/utils/groups/updateGroupById";
import { updateGroups } from "@/app/utils/updateData";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

const RenameGroupDialog = ({ lang, visible, onHide, group }: { lang: string, visible: boolean, onHide: () => void, group: Group }) => {
    const [pending, setPending] = useState<boolean>(false);
    const t = i18nClient.getFixedT(lang, "common");
    const [newTitle, setNewTitle] = useState<string>("");
    const titleRef = useRef(() => group.title);

    const router = useRouter();

    useEffect(() => {
        // @ts-ignore
        titleRef.current.value = group?.title
    }, [group])

    return (
        <Dialog
            header={t("group.group-rename-header")}
            resizable={false}
            draggable={false}
            onHide={() => {
                onHide();
                setNewTitle("");
            }}
            visible={visible}
            footer={
                <>
                    <Button label={t("cancel")} onClick={() => { onHide(); setNewTitle("") }} />
                    <Button
                        label={t("rename")}
                        onClick={() => {
                            // @ts-ignore
                            if (newTitle === "") {
                                toast.error(t("group.ask-for-group-name"), { position: "top-center" });
                            } else {
                                // @ts-ignore
                                setPending(true);
                                updateGroupById(group?.id, newTitle)
                                    .then(() => {
                                        toast.success(t("group.group-rename-success", { name: titleRef?.current?.value }));
                                        updateGroups();
                                        setPending(true);
                                        onHide();
                                        setNewTitle("");
                                        setTimeout(() => {
                                            router.refresh();
                                        }, 200);
                                    })
                                    .finally(() => setPending(false))
                            }
                        }}
                    />
                </>
            }
        >
            <div className="p-dialog-content-input">
                <p>{t("group.group-rename-message")}</p>
                {/* @ts-ignore */}
                <InputText ref={titleRef} required onInput={(e) => setNewTitle(e.target.value)} />
            </div>
        </Dialog>
    );
};

export default RenameGroupDialog;

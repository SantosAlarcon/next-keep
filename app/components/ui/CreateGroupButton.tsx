"use client"

import { createNewGroup } from '@/app/utils/groups/createNewGroup';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react'
import { toast } from 'sonner';
import BarLoader from './BarLoader';
import i18nClient from '@/app/i18n-client';
import { updateGroups } from '@/app/utils/updateData';

const CreateGroupButton = ({ lang, title, localeStrings: { createGroupHeader, createGroupMessage, create, cancel, askForGroupName } }: { lang: string, title: string, localeStrings: { createGroupHeader: string, createGroupMessage: string, create: string, cancel: string, askForGroupName: string } }) => {
    const t = i18nClient.getFixedT(lang, "common");
    const [pending, setPending] = useState<boolean>(false);
    const [newGroup, setNewGroup] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const router = useRouter();

    const handleCreateGroup = () => {
        if (newGroup === "") {
            toast.error(askForGroupName, { position: "top-center" });
        } else {
            setPending(true);
            createNewGroup(newGroup)
                .then(() => {
                    toast.success(t("group.create-group-success", { name: newGroup }));
                    setPending(false);
                    setVisible(false);
                    updateGroups();

                    setTimeout(() => {
                        router.refresh();
                    }, 200)

                    setNewGroup("");
                })
                .finally(() => {
                    setPending(false);
                });
        }
    }

    return (
        <>
            <Dialog header={createGroupHeader} footer={
                <>
                    <Button label={cancel} onClick={() => { setVisible(false); setNewGroup("") }} />
                    {/* @ts-ignore */}
                    <Button label={pending ? <BarLoader width="24px" height="24px" color="#eee" /> : create} onClick={handleCreateGroup} />
                </>
            } draggable={false} onHide={() => { setVisible(false); setNewGroup("") }} visible={visible}>
                <div className="p-dialog-content-input">
                    <p>{createGroupMessage}</p>
                    <InputText required value={newGroup} onChange={(e) => setNewGroup(e.target.value)} />
                </div>
            </Dialog>
            <Button onClick={() => setVisible(true)} icon="pi pi-plus" tooltip={title} tooltipOptions={{ position: "bottom" }} />
        </>
    )
}

export default CreateGroupButton

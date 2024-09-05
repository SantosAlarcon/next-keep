import { createNewGroup } from '@/app/utils/groups/createNewGroup';
import { updateGroups } from '@/app/utils/updateData';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { toast } from 'sonner';
import BarLoader from '../BarLoader';
import { useTranslation } from 'react-i18next';

const CreateGroupDialog = ({ lang, visible, onHide }: { lang: string, visible: boolean, onHide: () => void }) => {
    const {t} = useTranslation("common", {lng: lang})
    const [newGroup, setNewGroup] = useState<string>("");
    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();

    const handleCreateGroup = () => {
        if (newGroup === "") {
            toast.error(t("group.ask-for-group-name"), { position: "top-center" });
        } else {
            setPending(true);
            createNewGroup(newGroup)
                .then(() => {
                    toast.success(t("group.create-group-success", { name: newGroup }));
                    setPending(false);
                    onHide()
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
        <Dialog header={t("group.create-group-header")} footer={
            <>
                <Button label={t("cancel")} onClick={() => { onHide(); setNewGroup("") }} />
                {/* @ts-ignore */}
                <Button label={pending ? <BarLoader width="24px" height="24px" color="#eee" /> : t("create")} onClick={handleCreateGroup} />
            </>
        } draggable={false} 
            blockScroll={true}
            breakpoints={{"640px":"85vw"}}
            onHide={() => { onHide(); setNewGroup("") }} visible={visible}>
            <div className="p-dialog-content-input">
                <p>{t("group.create-group-message")}</p>
                <InputText required value={newGroup} onChange={(e) => setNewGroup(e.target.value)} />
            </div>
        </Dialog>
    )
}

export default CreateGroupDialog

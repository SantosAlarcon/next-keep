import i18nClient from '@/app/i18n-client';
import { changeNoteGroup } from '@/app/utils/notes/changeNoteGroup';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import type { Note } from '@/app/types';
import { toast } from 'sonner';
import BarLoader from '../BarLoader';
import { useState } from 'react';
import routerClient from '@/app/utils/routerClient';
import { updateNotes } from '@/app/utils/updateData';
import { Dropdown } from 'primereact/dropdown';

const ChangeGroupDialog = ({ lang, visible, note, groupTitle, onHide, allGroupTitles }: { lang: string, visible: boolean, note: Note, groupTitle: string, allGroupTitles: string[],  onHide: () => void }) => {
    const t = i18nClient.getFixedT(lang, "common")
    const [pending, setPending] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState(groupTitle)

    const confirmChange = () => {
        setPending(true)
        changeNoteGroup(note, groupTitle)
            .then(() => {
                toast.success(t("note.change-group-success"))
                updateNotes()
                onHide()

                setTimeout(() => {
                    routerClient().refresh()
                }, 200)

            })
            .finally(() => {
                setPending(false)
            })
    }

    const handleChange = (event) => {
        setSelectedGroup(event)
    }

    return (
        <Dialog header={t("note.change-group-header")}
            draggable={false}
            // @ts-ignore
            message={t("note.change-group-message")}
            visible={visible}
            footer={
                <>
                    <Button label={pending ? <BarLoader width='20px' height='20px' color='#eee' /> : t("change")} onClick={confirmChange} />
                </>
            }
            onHide={() => {
                onHide()
                setSelectedGroup(groupTitle);
            }}>
            <div className='p-dialog-content-input'>
                <p>{t("note.change-group-message")}</p>
                <Dropdown value={selectedGroup} onChange={(e) => handleChange(e)} options={allGroupTitles} />
            </div>
        </Dialog>
    )
}

export default ChangeGroupDialog

"use client"

import { Button } from 'primereact/button'
import { useState } from 'react'
import CreateGroupDialog from '@/app/components/ui/dialogs/CreateGroupDialog';

const CreateGroupButton = ({ lang, title }: { lang: string, title: string }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <CreateGroupDialog lang={lang} visible={visible} onHide={() => setVisible(false)} />
            <Button onClick={() => setVisible(true)} icon="pi pi-plus" tooltip={title} tooltipOptions={{ position: "right" }} />
        </>
    )
}

export default CreateGroupButton

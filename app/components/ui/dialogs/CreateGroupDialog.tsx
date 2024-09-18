import { createNewGroup } from '@/app/utils/groups/createNewGroup';
import { updateGroups } from '@/app/utils/updateData';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const CreateGroupDialog = ({ lang, visible, onHide }: { lang: string, visible: boolean, onHide: () => void }) => {
	const { t } = useTranslation("common", { lng: lang })
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
					toast.success(t("group.create-group-success", { name: newGroupTitle }));
					setPending(false);
					onHide()
					updateGroups();

					setTimeout(() => {
						router.refresh();
					}, 200)

					setNewGroupTitle("");
				})
				.finally(() => {
					setPending(false);
				});
		}
	}

	return (
		<Dialog header={t("group.create-group-header")} footer={
			<>
				<Button label={t("cancel")} onClick={() => { onHide(); setNewGroupTitle("") }} />
				{/* @ts-ignore */}
				<Button label={pending ? <span className="pi pi-spinner pi-spin"></span> : t("create")} onClick={handleCreateGroup} />
			</>
		} draggable={false}
			blockScroll={true}
			breakpoints={{ "640px": "85vw" }}
			onHide={() => { onHide(); setNewGroupTitle("") }} visible={visible}>
			<div className="p-dialog-content-input">
				<p>{t("group.create-group-message")}</p>
				<InputText required value={newGroupTitle} onChange={(e) => setNewGroupTitle(e.target.value)} />
			</div>
		</Dialog>
	)
}

export default CreateGroupDialog

"use client";

import { FileEdit } from "@primeicons/react/file-edit";
import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";

function EditButton({ noteId }: { noteId: string }) {
	const { t } = useT("common");
	const router = useRouter();
	const handleClick = () => {
		router.push(`/notes/edit/${noteId}`);
	};
	return (
		<Button aria-label={t("edit")} icon="pi pi-edit-icon" onClick={handleClick}>
			<FileEdit />
		</Button>
	);
}

export default EditButton;

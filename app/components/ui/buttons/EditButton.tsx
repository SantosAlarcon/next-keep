"use client";

import { FileEdit } from "@primeicons/react/file-edit";
import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import CustomTooltip from "../CustomTooltip";

function EditButton({ noteId }: { noteId: string }) {
    const { t } = useT("common");
    const router = useRouter();
    const handleClick = () => {
        router.push(`/notes/edit/${noteId}`);
    };
    return (
        <CustomTooltip side="bottom" align="center" tooltipText={t("edit")}>
            <Button
                aria-label={t("edit")}
                icon="pi pi-edit-icon"
                onClick={handleClick}
            >
                <FileEdit />
            </Button>
        </CustomTooltip>
    );
}

export default EditButton;

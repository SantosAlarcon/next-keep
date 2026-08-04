"use client";

import { Button } from "@primereact/ui/button";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import UpdateNoteContext from "@/app/context/UpdateNoteContext";
import { localeStore } from "@/app/store/localeStore";
import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { updateNote } from "@/app/utils/notes/updateNote";
import { updateNotes } from "@/app/utils/updateData";
import Spinner from "../Spinner";

const UpdateNoteButton = ({ label }: { label: string }) => {
	const router = useRouter();
	// @ts-ignore
	const { updatedNote } = useContext(UpdateNoteContext);
	const [pending, setPending] = useState<boolean>(false);
	// @ts-ignore
	const { locale } = localeStore.getState();
	const { t } = useTranslation("common", { lng: locale });

	const handleConfirmUpdate = () => {
		setPending(true);
		updateNote(updatedNote)
			.then(() => {
				toast.success(t("note-update-success"));
				router.back();
				updateNotes();

				setTimeout(() => {
					router.refresh();
				}, 50);
			})
			.catch(() => toast.error(t("note-update-error")))
			.finally(() => setPending(false));
	};

	return (
		<Button
			aria-label={label}
			onClick={handleConfirmUpdate}
			className={saveButtonStyles.save__button__container}
			severity="primary"
		>
			{pending ? <Spinner size={"32"} color="" /> : label}
		</Button>
	);
};

export default UpdateNoteButton;

"use client";

import UpdateNoteContext from "@/app/context/UpdateNoteContext";
import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { updateNote } from "@/app/utils/notes/updateNote";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const UpdateNoteButton = ({ label }: { label: string }) => {
	const router = useRouter();
	// @ts-ignore
	const { updatedNote } = useContext(UpdateNoteContext);
	const [pending, setPending] = useState<boolean>(false);

	const handleConfirmUpdate = () => {
		setPending(true);
		updateNote(updatedNote)
			.then(() => {
				router.back();

				setTimeout(() => {
					router.refresh();
				}, 50)

			})
			.finally(() => setPending(false));
	};

	return (
		<button onClick={handleConfirmUpdate} type="button" className={saveButtonStyles.save__button__container}>
			<span className={saveButtonStyles.save__button__label}>
				{pending ? <span className="pi pi-spin pi-spinner" /> : label}
			</span>
		</button>
	);
};

export default UpdateNoteButton;

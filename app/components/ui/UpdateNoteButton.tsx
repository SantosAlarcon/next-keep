"use client";

import UpdateNoteContext from "@/app/context/UpdateNoteContext";
import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { updateNote } from "@/app/utils/notes/updateNote";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import BarLoader from "./BarLoader";

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
                }, 200)

			})
			.finally(() => setPending(false));
	};

	return (
		<button onClick={handleConfirmUpdate} type="button" className={saveButtonStyles.save__button__container}>
			<span className={saveButtonStyles.save__button__label}>
				{pending ? <BarLoader width="24px" height="24px" color="#eee" /> : label}
			</span>
		</button>
	);
};

export default UpdateNoteButton;

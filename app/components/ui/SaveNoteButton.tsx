"use client";

import saveButtonStyles from "@/app/styles/SaveButton.module.css";
import { saveNewNote } from "@/app/utils/notes/saveNewNote";
import BarLoader from "./BarLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateNotes } from "@/app/utils/updateData";

const SaveNoteButton = ({ title }: { title: string }) => {
	const [pending, setPending] = useState<boolean>(false);
	const router = useRouter();

	const handleCreateNote = () => {
		setPending(true);
		saveNewNote()
			.then(() => {
				router.back();
                updateNotes();

				setTimeout(() => {
					router.refresh();
				}, 200);
			})
			.finally(() => setPending(false));
	};

	return (
		<button onClick={handleCreateNote} type="button" className={saveButtonStyles.save__button__container}>
			<span className={saveButtonStyles.save__button__title}>
				{pending ? <BarLoader width="24px" height="24px" color="#eee" /> : title}
			</span>
		</button>
	);
};

export default SaveNoteButton;

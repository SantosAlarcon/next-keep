"use client";

import { useRouter } from "next/navigation";
import EditIcon from "../icons/EditIcon";
import editButtonStyles from "@/styles/EditButton.module.css";

function EditButton({ label, noteId }: { label: string; noteId: string }) {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/notes/edit/${noteId}`);
	};
	return (
		<button onClick={handleClick} type="button" data-title={label} className={editButtonStyles.edit__button__container}>
			<EditIcon width="18px" height="18px" />
		</button>
	);
}

export default EditButton;

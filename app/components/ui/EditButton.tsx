"use client";

import { useRouter } from "next/navigation";
import EditIcon from "../icons/EditIcon";
import editButtonStyles from "@/styles/EditButton.module.css";
import { Button } from "primereact/button";

function EditButton({ label, noteId }: { label: string; noteId: string }) {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/notes/edit/${noteId}`);
	};
	return (
		<Button icon={<EditIcon width="20px" height="20px" />} onClick={handleClick} tooltip={label} tooltipOptions={{ position: "bottom" }} />
	);
}

export default EditButton;

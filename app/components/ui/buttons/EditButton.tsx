"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import "@/styles/primereact.css"

function EditButton({ label, noteId }: { label: string; noteId: string }) {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/notes/edit/${noteId}`);
	};
	return (
		<Button aria-label={label} icon="pi pi-edit-icon" onClick={handleClick} tooltip={label} tooltipOptions={{ position: "bottom" }} />
	);
}

export default EditButton;

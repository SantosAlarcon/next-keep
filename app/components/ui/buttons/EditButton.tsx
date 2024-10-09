"use client";

import { useRouter } from "next/navigation";
import EditIcon from "@/app/components/icons/EditIcon";
import { Button } from "primereact/button";

function EditButton({ label, noteId }: { label: string; noteId: string }) {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/notes/edit/${noteId}`);
	};
	return (
		<Button aria-label={label} icon={<EditIcon width="20px" height="20px" />} onClick={handleClick} tooltip={label} tooltipOptions={{ position: "bottom" }} />
	);
}

export default EditButton;

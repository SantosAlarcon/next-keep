import { getNoteById } from "@/app/utils/notes/getNoteById";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params: { note } }: { params: { note: string } }) => {
	const foundNote = await getNoteById(note)

	return {
		title: `${foundNote?.title} - Next Keep`,
	};
};

const AllNoteIdLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

export default AllNoteIdLayout;

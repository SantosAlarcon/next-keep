import { getNoteById } from "@/app/utils/notes/getNoteById";
import type { ReactNode } from "react";

export async function generateMetadata({ params }: any) {
	const foundNote = await getNoteById(params.note);

	return {
		title: `${foundNote?.title} - Next Keep`,
	};
}

const GroupNoteLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

export default GroupNoteLayout;

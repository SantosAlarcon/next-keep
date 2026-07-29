import { getNoteById } from "@/app/utils/notes/getNoteById";
import type { ReactNode } from "react";

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ note: string }>;
}) => {
	const { note } = await params;
	const foundNote = await getNoteById(note);
	return {
		title: `${foundNote?.title} - Next Keep`,
	};
};

const PinnedNoteIdLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

export default PinnedNoteIdLayout;

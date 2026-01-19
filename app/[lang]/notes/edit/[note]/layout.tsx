import { getNoteById } from "@/app/utils/notes/getNoteById";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ note: string }>;
}): Promise<Metadata> {
	const { note } = await params;
	const foundNote = await getNoteById(note);

	return {
		title: `${foundNote?.title}`,
	};
}

const EditNoteLayout = async ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

export default EditNoteLayout;

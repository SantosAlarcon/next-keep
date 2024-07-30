import { getNoteById } from "@/app/utils/database/notes/getNoteById"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export async function generateMetadata({ params: { note } }: { params: { note: string } }): Promise<Metadata> {
	const foundNote = await getNoteById(note)
	
    return {
		title: `${foundNote?.title}`
	}
}

const EditNoteLayout = async ({ children }: { children: ReactNode }) => {
	return (
		<>
			{children}
		</>
	)
}

export default EditNoteLayout

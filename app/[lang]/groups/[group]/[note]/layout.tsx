import { getNoteById } from '@/app/utils/notes/getNoteById'

export async function generateMetadata({ params, locale }: any) {
	const foundNote = getNoteById(params.note)
	return {
		title: `${foundNote?.title} - Next Keep`,
	}
}

const GroupNoteLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
}

export default GroupNoteLayout

import type { ReactNode } from 'react'
import type {Metadata} from "next"
import initTranslations from '@/app/i18n'

export const metadata: Metadata = {
    title: "New Note"
}

const NewNotePageLayout = async ({ params: { lang }, children }: { params: { lang: string }, children: ReactNode }) => {
	const { t } = await initTranslations(lang, ["common"])
	metadata.title = t("create-note")

	return (
		<>
			{children}
		</>
	)
}

export default NewNotePageLayout

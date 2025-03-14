import type { ReactNode } from 'react'
import type {Metadata} from "next"
import initTranslations from '@/app/i18n'

export const metadata: Metadata = {
    title: "New Note"
}

const NewNotePageLayout = async ({ params, children }: { params: Promise<{ lang: string }>, children: ReactNode }) => {
	const { lang } = await params
	const { t } = await initTranslations(lang, ["common"])
	metadata.title = t("create-note")

	return (
		<>
			{children}
		</>
	)
}

export default NewNotePageLayout

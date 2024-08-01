import initTranslations from '@/app/i18n'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: "All"
}

const AllNotesLayout = async ({ params: { lang }, children }: { params: { lang: string }, children: ReactNode }) => {
	const { t } = await initTranslations(lang, ["common"]);
	metadata.title = t("all");

	return (
		<>{children}</>
	)
}

export default AllNotesLayout

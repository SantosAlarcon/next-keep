import initTranslations from '@/app/i18n'
import type { Metadata } from 'next/types'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
		title: "Pinned",
}

const PinnedLayout = async ({ params: { lang }, children }: { params: { lang: string }, children: ReactNode }) => {
	const { t } = await initTranslations(lang, ["common"])
	metadata.title = `${t("pinned")}`
	return (
		<>{children}</>
	)
}

export default PinnedLayout

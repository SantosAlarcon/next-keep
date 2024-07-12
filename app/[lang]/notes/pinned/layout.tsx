import initTranslations from '@/app/i18n'
import { Metadata } from 'next/types'
import React from 'react'

export const metadata: Metadata = {
		title: `Pinned - Next Keep`,
}

const PinnedLayout = async ({ params: { lang }, children }: { params: { lang: string }, children: React.ReactNode }) => {
	const { t } = await initTranslations(lang, ["common"])
	metadata.title = `${t("pinned")}`
	return (
		<>{children}</>
	)
}

export default PinnedLayout

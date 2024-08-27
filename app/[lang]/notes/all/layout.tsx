import initTranslations from '@/app/i18n'
import type { ReactNode } from 'react'

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
	const {t} = await initTranslations(lang, ["common"])
	return {
		title: t("all"),
	}
}

const AllNotesLayout = ({ children }: { children: ReactNode }) => {

	return (
		<>{children}</>
	)
}

export default AllNotesLayout

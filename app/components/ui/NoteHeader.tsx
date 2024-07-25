import { Note } from '@/app/types'
import React from 'react'
import noteHeaderStyles from '@/app/styles/NoteHeader.module.css'
import initTranslations from '@/app/i18n'

const NoteHeader = async ({ lang, note }: { lang: string, note: Note }) => {
	const {t} = await initTranslations(lang, ["common"])
	return (
		<section className={noteHeaderStyles.note__header__container}>
			<h1 className={noteHeaderStyles.note__header__title}>{note.title}</h1>
			<span className={noteHeaderStyles.note__header__date}>{t("last-update")}: {new Date(note.updatedDate).toLocaleString(lang, {
				dateStyle: "full",
				timeStyle: "short",
			})}</span>
		</section>
	)
}

export default NoteHeader

import type { Note } from '@/app/types'
import noteHeaderStyles from '@/app/styles/NoteHeader.module.css'
import initTranslations from '@/app/i18n'
import TogglePinButton from './TogglePinButton'

const NoteHeader = async ({ lang, note }: { lang: string, note: Note }) => {
	const {t} = await initTranslations(lang, ["common"])
	return (
		<section className={noteHeaderStyles.note__header__container}>
			<h1 className={noteHeaderStyles.note__header__title}>{note.title}</h1>
            <TogglePinButton title={t("toggle-pin")} note={note} /> 
			<span className={noteHeaderStyles.note__header__date}>{t("last-update")}: {new Date(note.updatedDate).toLocaleString(lang, {
				dateStyle: "full",
				timeStyle: "short",
			})}</span>
			<span className={noteHeaderStyles.note__header__date}>{t("publish-date")}: {new Date(note.publishedDate).toLocaleString(lang, {
				dateStyle: "full",
				timeStyle: "short",
			})}</span>
		</section>
	)
}

export default NoteHeader

import type { Note } from '@/app/types'
import noteHeaderStyles from '@/app/styles/NoteHeader.module.css'
import initTranslations from '@/app/i18n'
import TogglePinButton from './TogglePinButton'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
import { ButtonGroup } from 'primereact/buttongroup'
import ChangeGroupButton from "./ChangeGroupButton"
import { getGroupById } from '@/app/utils/database/groups/getGroupById'

const NoteHeader = async ({ lang, note }: { lang: string, note: Note }) => {
	const { t } = await initTranslations(lang, ["common"])
    // @ts-ignore
	const noteGroupTitle = await getGroupById(note.group).then((data) => data?.title)

	return (
		<section className={noteHeaderStyles.note__header__container}>
			<section className={noteHeaderStyles.note__header__upper}>
				<h1 className={noteHeaderStyles.note__header__title}>{note.title}</h1>
				<div className={noteHeaderStyles.note__header__upper__right}>
					<ButtonGroup>
						<EditButton label={t("edit")} noteId={note.id} />
						<ChangeGroupButton label={t("change-group")} 
                        localeStrings={{changeString: t("change"), selectGroupHeader: t("select-group-header"), selectGroupMessage: t("select-group-message")}} 
                        note={note} 
                        // @ts-ignore
                        groupTitle={noteGroupTitle} />
						<TogglePinButton title={t("toggle-pin")} note={note} />
						<DeleteButton label={t("delete")} noteId={note.id} localeStrings={{
							yes: t("yes"),
							no: t("no"),
							confirmMessage: t("note-delete-confirm"),
							confirmHeader: t("note-delete-confirm-header"),
						}} />
					</ButtonGroup>
				</div>
			</section>
			<span className={noteHeaderStyles.note__header__date}><b>{t("last-update")}:</b> {new Date(note.updatedDate).toLocaleString(lang, {
				dateStyle: "full",
				timeStyle: "short",
			})}</span>
			<span className={noteHeaderStyles.note__header__date}><b>{t("publish-date")}:</b> {new Date(note.publishedDate).toLocaleString(lang, {
				dateStyle: "full",
				timeStyle: "short",
			})}</span>
		</section>
	)
}

export default NoteHeader

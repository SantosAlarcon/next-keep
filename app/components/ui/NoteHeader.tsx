import { ButtonGroup } from "@primereact/ui/buttongroup";
import ChangeGroupButton from "@/app/components/ui/buttons/ChangeGroupButton";
import DeleteButton from "@/app/components/ui/buttons/DeleteButton";
import EditButton from "@/app/components/ui/buttons/EditButton";
import TogglePinButton from "@/app/components/ui/buttons/TogglePinButton";
import initTranslations from "@/app/i18n";
import noteHeaderStyles from "@/app/styles/NoteHeader.module.css";
import type { Note } from "@/app/types";
import { getGroupById } from "@/app/utils/groups/getGroupById";
import BackButton from "./buttons/BackButton";

const NoteHeader = async ({ lang, note }: { lang: string; note: Note }) => {
    const { t } = await initTranslations(lang, ["common"]);
    const noteGroupTitle = await getGroupById(note.group as string).then(
        (data) => data?.title,
    );

    return (
        <section className={noteHeaderStyles.note__header__container}>
            <section className={noteHeaderStyles.note__header__upper}>
                <h1 className={noteHeaderStyles.note__header__title}>{note.title}</h1>
                <div className={noteHeaderStyles.note__header__upper__right}>
                    <ButtonGroup>
                        <BackButton />
                        <EditButton noteId={note.$id} />
                        <ChangeGroupButton
                            label={t("note.change-group")}
                            note={note}
                            groupTitle={noteGroupTitle}
                        />
                        <TogglePinButton note={note} />
                        <DeleteButton noteId={note.$id} />
                    </ButtonGroup>
                </div>
            </section>
            <span className={noteHeaderStyles.note__header__date}>
                <b>{t("last-update")}:</b>{" "}
                {new Date(note.lastUpdated).toLocaleString(lang, {
                    dateStyle: "full",
                    timeStyle: "short",
                })}
            </span>
            <span className={noteHeaderStyles.note__header__date}>
                <b>{t("publish-date")}:</b>{" "}
                {new Date(note.$createdAt).toLocaleString(lang, {
                    dateStyle: "full",
                    timeStyle: "short",
                })}
            </span>
        </section>
    );
};

export default NoteHeader;

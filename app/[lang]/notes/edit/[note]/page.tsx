import LocalizedTitleInput from "@/app/components/LocalizedTitleInput";
import BarLoader from "@/app/components/ui/BarLoader";
import UpdateNoteButton from "@/app/components/ui/buttons/UpdateNoteButton";
import UpdateNoteProvider from "@/app/components/UpdateNoteProvider";
import initTranslations from "@/app/i18n";
import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import { editorRef } from "@/app/utils/editorRef";
import styles from "@/styles/NotePage.module.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditorComp = dynamic(() => import("@/app/components/CustomMDXEditor").then((mod) => mod.default), { ssr: false });

const EditNotePage = async ({ params: { note, lang } }: { params: { note: string; lang: string } }) => {
	const foundNote = await getNoteById(note);
	const { t } = await initTranslations(lang, ["common"]);

	return (
		// @ts-ignore
		<UpdateNoteProvider value={foundNote}>
			<main className={styles.note__page__container}>
				<Suspense fallback={<BarLoader width="128px" height="128px" color="#eee" />}>
					<LocalizedTitleInput placeholder={t("title")} title={foundNote ? foundNote.title : ""} isEditing={true} />
                    {/* @ts-ignore */}
					<EditorComp editorRef={editorRef} text={foundNote ? foundNote?.data : ""} isEditing={true} />
					<UpdateNoteButton label={t("update-note")} />
				</Suspense>
			</main>
		</UpdateNoteProvider>
	);
};

export default EditNotePage;

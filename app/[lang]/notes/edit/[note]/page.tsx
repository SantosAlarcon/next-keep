import LocalizedTitleInput from "@/app/components/LocalizedTitleInput";
import SaveNote from "@/app/components/ui/SaveNote";
import Spinner from "@/app/components/ui/Spinner";
import initTranslations from "@/app/i18n";
import { getNoteById } from "@/app/utils/database/notes/getNoteById";
import { editorRef } from "@/app/utils/editorRef";
import styles from "@/styles/NotePage.module.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const EditorComp = dynamic(() => import("@/app/components/CustomMDXEditor"), { ssr: false });

const EditNotePage = async ({ params: { note, lang } }: { params: { note: string; lang: string } }) => {
	const foundNote = await getNoteById(note);
	const { t } = await initTranslations(lang, ["common"]);

	return (
		<Suspense fallback={<Spinner width="128px" height="128px" />}>
			<main className={styles.note__page__container}>
				<LocalizedTitleInput placeholder={t("title")} title={foundNote?.title} />
				<EditorComp editorRef={editorRef} markdown={foundNote?.data} />
				<SaveNote title={t("save-note")} />
			</main>
		</Suspense>
	);
};

export default EditNotePage;

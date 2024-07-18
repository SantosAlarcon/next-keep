import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import React, { Suspense } from "react";
import "@mdxeditor/editor/style.css";
import dynamic from "next/dynamic";
import initTranslations from "@/app/i18n";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import LocalizedTitleInput from "@/app/components/LocalizedTitleInput";
import { editorRef} from "@/app/utils/editorRef"

const EditorComp = dynamic(() => import("@/app/components/CustomMDXEditor"), { ssr: false });

const NewNotePage = async ({ params: { lang } }: { params: { lang: string } }) => {
	const { t } = await initTranslations(lang, ["common"])
	const newNote = useNewNoteStore.getState().newNote

	return (
		<main className={NewNotePageStyles.new__note__page__container}>
		    <Suspense fallback={<div>Loading...</div>}>
			<LocalizedTitleInput placeholder={t("title")} />
			<EditorComp editorRef={editorRef} markdown={newNote.data} />
		    </Suspense>
		</main>
	)
};

export default NewNotePage;

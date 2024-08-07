import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import { Suspense } from "react";
import "@mdxeditor/editor/style.css";
import LocalizedTitleInput from "@/app/components/LocalizedTitleInput";
import Spinner from "@/app/components/ui/Spinner";
import initTranslations from "@/app/i18n";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import { editorRef } from "@/app/utils/editorRef";
import dynamic from "next/dynamic";
import SaveNoteButton from "@/app/components/ui/SaveNoteButton";
import UpdateNoteProvider from "@/app/components/UpdateNoteProvider";

const EditorComp = dynamic(() => import("@/app/components/CustomMDXEditor"), { ssr: false });

const NewNotePage = async ({ params: { lang } }: { params: { lang: string } }) => {
	const { t } = await initTranslations(lang, ["common"]);
	const newNote = useNewNoteStore.getState().newNote;

	return (
		<UpdateNoteProvider value={newNote}>
			<main className={NewNotePageStyles.new__note__page__container}>
				<Suspense fallback={<Spinner width="128px" height="128px" />}>
					<LocalizedTitleInput placeholder={t("title")} title={newNote.title} isEditing={false} />
					<EditorComp editorRef={editorRef} markdown={newNote.data} isEditing={false} />
					<SaveNoteButton title={t("save-note")} />
				</Suspense>
			</main>
		</UpdateNoteProvider>
	);
};

export default NewNotePage;

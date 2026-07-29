import NewNotePageStyles from "@/app/styles/NewNotePage.module.css";
import { Suspense } from "react";
import LocalizedTitleInput from "@/app/components/LocalizedTitleInput";
import initTranslations from "@/app/i18n";
import { useNewNoteStore } from "@/app/store/newNoteStore";
import { editorRef } from "@/app/utils/editorRef";
import dynamic from "next/dynamic";
import SaveNoteButton from "@/app/components/ui/buttons/SaveNoteButton";
import UpdateNoteProvider from "@/app/components/UpdateNoteProvider";
import BarLoader from "@/app/components/ui/BarLoader";

const EditorComp = dynamic(() => import("@/app/components/CustomMDXEditor"));

const NewNotePage = async ({
	params,
}: {
	params: Promise<{ lang: string }>;
}) => {
	const { lang } = await params;
	const { t } = await initTranslations(lang, ["common"]);
	const newNote = useNewNoteStore.getState().newNote;

	return (
		// @ts-ignore
		<UpdateNoteProvider value={newNote}>
			<main className={NewNotePageStyles.new__note__page__container}>
				<Suspense
					fallback={<BarLoader width="128px" height="128px" color="#eee" />}
				>
					<LocalizedTitleInput
						placeholder={t("title")}
						title={newNote.title}
						isEditing={false}
					/>
					<EditorComp
						lang={lang}
                        // @ts-ignore
						editorRef={editorRef}
						text={newNote.data}
						isEditing={false}
					/>
					<SaveNoteButton lang={lang} title={t("save-note")} />
				</Suspense>
			</main>
		</UpdateNoteProvider>
	);
};

export default NewNotePage;

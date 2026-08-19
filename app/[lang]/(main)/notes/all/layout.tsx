import { type ReactNode } from "react";
import initTranslations from "@/app/i18n";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	const { t } = await initTranslations(lang, ["common"]);
	return {
		title: t("all"),
	};
}

const AllNotesLayout = ({ children }: { children: ReactNode }) => {
	return <>{children}</>;
};

export default AllNotesLayout;

import { QueryClient } from "@tanstack/react-query";
import dynamic2 from "next/dynamic";
import type { ReactNode } from "react";
import { DataSync } from "@/app/components/DataSync";
import { LocaleSync } from "@/app/components/LocaleSync";
import { dataStore } from "@/app/store/dataStore";
import { getAllData } from "@/app/utils/getAllData";

const SidebarClientNoSSR = dynamic2(() => import("@/components/SidebarClient"));
const MainShellNoSSR = dynamic2(() => import("@/app/components/MainShell"));

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{
		lang: string;
	}>;
}) {
	const { lang } = await params;
	const queryClient: QueryClient = new QueryClient();
	const state = await queryClient.fetchQuery({
		queryKey: ["notes", "groups", "pinnedNotes", "pinnedGroups"],
		queryFn: getAllData,
	});

	// @ts-ignore
	const { filter } = dataStore.getState();

	return (
		<>
			<LocaleSync
				state={{
					locale: lang,
				}}
			/>
			<DataSync
				state={{
					allGroupTitles: state.allGroupTitles,
					allGroups: state.allGroups,
					allNoteAmounts: {},
					allNotes: state.allNotes,
					allPinnedNotes: state.allPinnedNotes,
					filter: filter,
				}}
			/>
			<MainShellNoSSR lang={lang}>
				<div className="main__body">
					<SidebarClientNoSSR>
						<main id="main-content">{children}</main>
					</SidebarClientNoSSR>
				</div>
			</MainShellNoSSR>
		</>
	);
}

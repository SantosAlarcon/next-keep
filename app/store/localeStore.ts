import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type LocaleStoreProps = {
	locale: string;
};

export const localeStore = create(
	devtools(
		(set) => ({
			locale: "en",
			setLocale: (locale: string) => set({ locale: locale }),
		}),
		{ name: "Locale Store", enabled: false },
	),
);

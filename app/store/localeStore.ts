import { create } from "zustand";
import { persist } from "zustand/middleware";

type LocaleStoreType = {
    locale: string,
    setLocale: (locale: string) => void
}

// @ts-ignore
export const localeStore = create<LocaleStoreType>(persist((set) => ({
    locale: "en",
    setLocale: (locale: string) => set({locale: locale})
}), {name: "Locale Store"}))

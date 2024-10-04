import type { Models } from "appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AuthStoreProps = {
	user: Models.User<Models.Preferences> | null
	session: Models.Session | null
    setUser: () => void
    setSession: () => void
}

export const authStore = create(devtools((set) => ({
	user: null,
	session: null,
	setUser: (user: Models.User<Models.Preferences>) => set({ user }),
	setSession: (session: Models.Session) => set({ session }),
}), {name: "Auth Store", enabled: false}))

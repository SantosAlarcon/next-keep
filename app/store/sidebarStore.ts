import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface sidebarStoreProps {
    expanded: boolean,
    toggleExpanded: () => void
}

// @ts-ignore
export const sidebarStore = create<sidebarStoreProps>(devtools((set) => ({
    expanded: true,
    // @ts-ignore
    toggleExpanded: () => set((state) => !state.expanded)
}), {name: "Sidebar Store"}))

import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface sidebarStoreProps {
    expanded: boolean,
    toggleExpanded: () => void
}

// @ts-ignore
export const sidebarStore = create<sidebarStoreProps>(devtools((set, get) => ({
    expanded: true,
    // @ts-ignore
    toggleExpanded: () => {
		set({expanded: !get().expanded})
    }
}), {name: "Sidebar Store"}))

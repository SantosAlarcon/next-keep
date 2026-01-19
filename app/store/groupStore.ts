import { create } from "zustand";
import { getAllGroupTitles } from "../utils/groups/getAllGroupTitles";
import { devtools } from "zustand/middleware";

export const groupStore = create(
	devtools(
		(set) => ({
			groupTitles: [],
			fetchTitles: async () => {
				const titles = await getAllGroupTitles();
				set({ groupTitles: titles });
			},
		}),
		{ name: "Group Store", enabled: false },
	),
);

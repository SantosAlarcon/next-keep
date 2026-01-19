import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getAllGroupTitles } from "../utils/groups/getAllGroupTitles";

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

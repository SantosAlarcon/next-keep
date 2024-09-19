import type { Group } from "@/app/types";
import { getAllGroups } from "./getAllGroups";

export const getAllGroupTitles = async () => {
	const allGroups = await getAllGroups();
	const allGroupTitles = allGroups?.map((group: Group) => group.title);
	return allGroupTitles;
};

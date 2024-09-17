import type { Group } from "@/app/types";
import { getSession } from "../getSession";
import type { Models } from "appwrite";

export const getAllGroupTitles = async () => {
	const session: Models.Session = await getSession();
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groups_appwrite?userId=${session.userId}`);
	const allGroups = await response.json();
	const allGroupTitles = allGroups?.map((group: Group) => group.title);
	return allGroupTitles;
};

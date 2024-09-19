import { appwriteProjectId, groupsEndpoint } from "@/app/constants";
import { getSession } from "../getSession";
import type { Group } from "@/app/types";

export const getAllGroups = async () => {
    const session = await getSession();
    const response = await fetch(groupsEndpoint, {
        headers: {
            "X-Appwrite-Project": appwriteProjectId,
        },
    });

    const allGroups = await response.json();
    return allGroups.documents
        .filter((group: Group) => group.userId === session.userId)
        .sort((a: Group, b: Group) => a.title.localeCompare(b.title));
};

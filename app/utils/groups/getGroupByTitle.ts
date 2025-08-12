import { appwriteProjectId, groupsEndpoint } from "@/app/constants";

export const getGroupByTitle = async (groupTitle: string) => {
    const response = await fetch(
        `${groupsEndpoint}?queries[0]={"method":"equal","attribute":"title","values":["${groupTitle}"]}`,
        {
            headers: {
                "Content-Type": "application/json",
                "X-Appwrite-Project": appwriteProjectId,
            },
            cache: "no-cache",
        },
    );
    const group = await response.json();
    return group.documents;
};

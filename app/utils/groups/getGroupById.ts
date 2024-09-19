import { appwriteProjectId, groupsEndpoint } from "@/app/constants"

export const getGroupById = async (id: string) => {
    return await fetch(`${groupsEndpoint}/${id}`, {
        headers: {
            "X-Appwrite-Project": appwriteProjectId
        }
    }).then((response) => response.json())
}

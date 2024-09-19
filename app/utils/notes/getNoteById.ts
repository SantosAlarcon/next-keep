import { appwriteProjectId, notesEndpoint } from "@/app/constants";

export const getNoteById = async (id: string) => {
    return await fetch(`${notesEndpoint}/${id}`, {
        headers: {
            "X-Appwrite-Project": appwriteProjectId,
        },
    }).then((response) => response.json());
};

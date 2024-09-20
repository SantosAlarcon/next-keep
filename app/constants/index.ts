export const note = "/note.svg";
export const pinned = "/pinned.svg";

export const mainSidebarLinks = [
    {
        name: "all",
        path: "/notes/all",
        icon: note,
    },
    {
        name: "pinned",
        path: "/notes/pinned",
        icon: pinned,
    },
];

export const variants = {
    expanded: {
        width: "23rem",
    },
    collapsed: {
        width: "5rem",
    },
};

export const logoVariants = {
    expanded: {
        width: "100px",
        height: "100px",
    },
    collapsed: {
        width: "50px",
        height: "50px",
    },
};

export const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!
export const appwriteAPIKey = process.env.NEXT_PUBLIC_APPWRITE_API_KEY!
export const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT!
export const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID!
export const notesCollectionID = process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!
export const groupsCollectionID = process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!
export const notesEndpoint = `${apiEndpoint}/databases/${databaseID}/collections/${notesCollectionID}/documents`;
export const groupsEndpoint = `${apiEndpoint}/databases/${databaseID}/collections/${groupsCollectionID}/documents`;
export const clientNotesEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!}/documents`;
export const clientGroupsEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT!}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID!}/collections/${process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!}/documents`;

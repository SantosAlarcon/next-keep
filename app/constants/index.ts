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

export const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID!
export const notesCollectionID = process.env.NEXT_PUBLIC_NOTES_ID!
export const groupsCollectionID = process.env.NEXT_PUBLIC_GROUPS_ID!
export const notesEndpoint = `${process.env.API_ENDPOINT}/databases/${process.env.DATABASE_ID}/collections/${process.env.NOTES_COLLECTION_ID}/documents`;
export const groupsEndpoint = `${process.env.API_ENDPOINT}/databases/${process.env.DATABASE_ID}/collections/${process.env.GROUPS_COLLECTION_ID}/documents`;
export const clientNotesEndpoint = `${process.env.API_NEXT_PUBLIC_ENDPOINT}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID}/records`;
export const clientGroupsEndpoint = `${process.env.API_NEXT_PUBLIC_ENDPOINT}/databases/${process.env.NEXT_PUBLIC_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID}/records`;

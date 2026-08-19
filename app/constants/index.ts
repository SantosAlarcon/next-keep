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

export const mainURL = process.env.NEXT_PUBLIC_URL!;
export const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
export const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT!;
export const databaseID = process.env.NEXT_PUBLIC_DATABASE_ID!;
export const notesCollectionID = process.env.NEXT_PUBLIC_NOTES_COLLECTION_ID!;
export const groupsCollectionID = process.env.NEXT_PUBLIC_GROUPS_COLLECTION_ID!;
export const notesEndpoint = `${apiEndpoint}/databases/${databaseID}/collections/${notesCollectionID}/documents`;
export const groupsEndpoint = `${apiEndpoint}/databases/${databaseID}/collections/${groupsCollectionID}/documents`;

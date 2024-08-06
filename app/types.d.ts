export type Note = {
    id: string;
    title: string;
    publishedDate: string;
    updatedDate: string;
    group: string | null;
    isPinned: boolean;
    data: string;
}

export type Group = {
    id: string;
    title: string;
}

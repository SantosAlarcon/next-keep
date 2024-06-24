export type Note = {
    id: string;
    title: string;
    publishedDate: Date;
    updatedDate: Date;
    group: string | null;
    isFixated: boolean;
    data: string;
}

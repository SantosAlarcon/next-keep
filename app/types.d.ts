export type Note = {
	$id: string;
	title: string;
	data: string;
	group: string | null;
	isPinned: boolean;
	userId: string;
	lastUpdated: string;
	$createdAt: string;
	$updatedAt: string;
};

export type Group = {
	$id: string;
	title: string;
	userId: string;
};

export enum AsyncFunctionState {
	Pending = "Pending",
	OK = "OK",
	Error = "Error",
}

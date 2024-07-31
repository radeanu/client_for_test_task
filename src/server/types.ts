export type AuthPayload = {
	username?: string;
	password?: string;
};

export type BaseNote = {
	body: string;
	title: string;
};

export type Note = BaseNote & {
	id: number;
	created_at: string;
};

export type Paginator<T> = {
	count: number;
	next: number | null;
	previous: number | null;
	results: Array<T>;
};

export type ApiNotesResult = Paginator<Note>;

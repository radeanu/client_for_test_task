export type ApiResponse<T> = {
	ok: boolean;
	message?: string;
	data?: T;
};

export type User = {
	email: string;
	user_id: number;
	username: string;
};

export type AuthUser = User & {
	token: string;
};

export type LoginPayload = {
	username: string;
	password: string;
};

export type Note = {
	id: number;
	body: string;
	title: string;
	created_at: string;
};

export type ApiNotesResult = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Note[];
};

export type Pagination = {
	count: number;
	page: number;
	perPage: number;
	next: number | null;
	previous: number | null;
};

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

export type BaseNote = {
	body: string;
	title: string;
};

export type Note = BaseNote & {
	id: number;
	created_at: string;
};

export type ApiNotesResult = {
	count: number;
	next: number | null;
	previous: number | null;
	results: Note[];
};

export type NoteFormFieldSchema = {
	name: keyof BaseNote;
	value: string;
	label: string;
	required: boolean;
};

export type UserFormFieldSchema = {
	name: keyof LoginPayload;
	value: string;
	label: string;
	required: boolean;
};

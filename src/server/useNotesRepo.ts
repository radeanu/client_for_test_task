import testData from '@/server/test_data.json';

import { type BaseNote, type Note } from '@/server/types';

const DOCS = testData as Note[];

let notesRepo: ReturnType<typeof useNotesRepo> | undefined;

function useNotesRepo() {
	let notes: Note[] = DOCS;

	function getNotes(): Note[] {
		return notes;
	}

	function createNote(note: BaseNote): Note {
		const newNote = {
			...note,
			id: notes.length + 1,
			created_at: new Date().toISOString()
		};

		notes.push(newNote);

		return newNote;
	}

	function deleteNote(id: number) {
		notes = notes.filter((n) => n.id !== id);
	}

	function getNote(id: number) {
		return notes.find((n) => n.id === id);
	}

	function updateNote(id: number, note: BaseNote) {
		const targetIndex = notes.findIndex((n) => n.id === id);

		if (targetIndex === -1) return null;

		notes[targetIndex] = {
			...notes[targetIndex],
			...note
		};

		return notes[targetIndex];
	}

	return {
		getNote,
		getNotes,
		createNote,
		deleteNote,
		updateNote
	};
}

export function getNotesRepo() {
	if (notesRepo) return notesRepo;

	notesRepo = useNotesRepo();

	return notesRepo;
}

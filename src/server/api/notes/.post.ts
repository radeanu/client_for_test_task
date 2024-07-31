import { type BaseNote } from '@/server/types';
import useAuthGuard from '@/server/useAuthGuard';
import { getNotesRepo } from '@/server/useNotesRepo';

const notesRepo = getNotesRepo();

export default defineEventHandler(async (event) => {
	useAuthGuard(event);

	const note = await readBody<BaseNote>(event);
	return notesRepo.createNote(note);
});

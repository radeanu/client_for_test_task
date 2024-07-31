import { type Note } from '@/server/types';
import { paginateDocs } from '@/server/utils';
import { getNotesRepo } from '@/server/useNotesRepo';

const notesRepo = getNotesRepo();

export default defineEventHandler(async (event) => {
	const query = getQuery<{ page: string | null }>(event);
	const page = query.page ?? '1';

	return paginateDocs<Note>(notesRepo.getNotes(), parseInt(page), 10);
});

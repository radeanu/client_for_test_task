import useAuthGuard from '@/server/useAuthGuard';
import { getNotesRepo } from '@/server/useNotesRepo';

const notesRepo = getNotesRepo();

export default defineEventHandler(async (event) => {
	useAuthGuard(event);

	const id = getRouterParam(event, 'id');

	if (!id) {
		return createError({
			status: 404,
			statusMessage: 'Bad Request',
			message: 'ИД не передан'
		});
	}

	return notesRepo.deleteNote(parseInt(id));
});

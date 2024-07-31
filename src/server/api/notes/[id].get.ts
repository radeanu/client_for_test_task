import { getNotesRepo } from '@/server/useNotesRepo';

const notesRepo = getNotesRepo();

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		return createError({
			status: 404,
			statusMessage: 'Bad Request',
			message: 'ИД не передан'
		});
	}

	const findNote = notesRepo.getNote(parseInt(id));

	if (!findNote) {
		return createError({
			status: 404,
			statusMessage: 'Not Found',
			message: 'Заметка не найдено'
		});
	}

	return findNote;
});

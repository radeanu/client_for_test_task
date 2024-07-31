import { type BaseNote } from '@/server/types';
import useAuthGuard from '@/server/useAuthGuard';
import { getNotesRepo } from '@/server/useNotesRepo';

const notesRepo = getNotesRepo();

export default defineEventHandler(async (event) => {
	await useAuthGuard(event);

	const note = await readBody<BaseNote>(event);
	const id = getRouterParam(event, 'id');

	if (!id) {
		return createError({
			status: 404,
			statusMessage: 'Bad Request',
			message: 'ИД не передан'
		});
	}

	const noteId = parseInt(id);
	const findNote = notesRepo.getNote(noteId);

	if (!findNote) {
		return createError({
			status: 404,
			statusMessage: 'Not Found',
			message: 'Заметка не найдено'
		});
	}

	const updatedNote = notesRepo.updateNote(noteId, note);

	if (!updatedNote) {
		return createError({
			status: 404,
			statusMessage: 'Bad Request',
			message: 'Ошибка при обновлении'
		});
	}

	return updatedNote;
});

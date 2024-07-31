import { useJwtAuth } from '@/server/useJwt';
import { type AuthPayload } from '@/server/types';

export default defineEventHandler(async (event) => {
	const { password, username } = await readBody<AuthPayload>(event);
	const config = useRuntimeConfig(event);
	const jwtAuth = useJwtAuth(config.privateKey);

	if (password !== 'webmaster' || username !== 'webmaster') {
		return createError({
			status: 401,
			statusMessage: 'Bad Request',
			message: 'Данные переданы неверно'
		});
	}

	const token = jwtAuth.genToken({ sub: username }, { expiresIn: '5m' });

	return {
		email: 'test@test.ru',
		user_id: 1,
		username: username,
		token
	};
});

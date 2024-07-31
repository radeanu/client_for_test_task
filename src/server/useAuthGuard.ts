import { type H3Event, type EventHandlerRequest } from 'h3';

import { useJwtAuth } from '@/server/useJwt';

const unauthorizeError = createError({
	status: 401,
	statusMessage: 'Bad Request',
	message: 'Пользователь неавторизованн'
});

export default async (event: H3Event<EventHandlerRequest>) => {
	const config = useRuntimeConfig(event);
	const jwtAuth = useJwtAuth(config.privateKey);

	const tokenHeader = event.headers.get('Authorization');
	const token = tokenHeader ? tokenHeader.split('Bearer ')?.[1] : null;

	if (!token) throw unauthorizeError;

	try {
		jwtAuth.verifyToken(token);
	} catch (error) {
		throw unauthorizeError;
	}
};

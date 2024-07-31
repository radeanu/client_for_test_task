import useAuthGuard from '@/server/useAuthGuard';

export default defineEventHandler(async (event) => {
	useAuthGuard(event);

	return { status: 'OK' };
});

import type { AuthUser, LoginPayload, ApiNotesResult } from '@/common/types';

export default function () {
	const { $api } = useNuxtApp();

	function userLogin(payload: LoginPayload) {
		return $api<AuthUser>('/api/auth/', { body: payload, method: 'POST' });
	}

	function fetchNotes(page: number) {
		return $api<ApiNotesResult>('/api/notes/', { method: 'GET', query: { page } });
	}

	return {
		userLogin,
		fetchNotes
	};
}

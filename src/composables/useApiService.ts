import { useAuthStore } from '@/stores/auth';
import type {
	AuthUser,
	LoginPayload,
	ApiNotesResult,
	BaseNote,
	Note
} from '@/common/types';

export function useApiService() {
	const authStore = useAuthStore();

	const apiFetch = $fetch.create({
		baseURL: useRuntimeConfig().public.API_BASE_URL,
		onRequest: ({ options }) => {
			const token = authStore.getToken();
			if (!token) return;

			options.headers = new Headers(options.headers);
			options.headers.set('Authorization', `Bearer ${token}`);
		},
		onResponse: async (ctx) => {
			if (ctx.response.status === 401) {
				await authStore.logout();
				return;
			}
		}
	});

	function userLogin(payload: LoginPayload) {
		return apiFetch<AuthUser>('/api/auth/', { body: payload, method: 'POST' });
	}

	function checkAuth() {
		return apiFetch<AuthUser>('/api/check_token/');
	}

	function fetchNotes(page: number) {
		return apiFetch<ApiNotesResult>('/api/notes/', {
			method: 'GET',
			query: { page }
		});
	}

	function postCreateNote(note: BaseNote) {
		return apiFetch<Note>('/api/notes/', {
			method: 'POST',
			body: note
		});
	}

	function postUpdateNote(id: number, note: BaseNote) {
		return apiFetch<Note>(`/api/notes/${id}/`, {
			method: 'PUT',
			body: note
		});
	}

	function postDeleteNote(id: number) {
		return apiFetch<undefined>(`/api/notes/${id}/`, {
			method: 'DELETE'
		});
	}

	function getNoteById(id: number) {
		return apiFetch<Note>(`/api/notes/${id}/`, {
			method: 'GET'
		});
	}

	return {
		apiFetch,
		userLogin,
		checkAuth,
		fetchNotes,
		getNoteById,
		postCreateNote,
		postUpdateNote,
		postDeleteNote
	};
}

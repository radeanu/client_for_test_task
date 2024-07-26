import { defineStore } from 'pinia';

import { useApiService, useLocalStorage } from '@/composables';
import type { LoginPayload, AuthUser } from '@/common/types';

const TOKEN_KEY = 'token';

export const useAuthStore = defineStore('auth', () => {
	const apiService = useApiService();
	const appLocalStorage = useLocalStorage();

	const user = ref<AuthUser | null>(null);

	const isAuthenticated = computed(() => {
		const token = getToken();
		return token !== null;
	});

	watchEffect(() => {
		if (!user.value?.token) return;

		appLocalStorage.setItem(TOKEN_KEY, user.value.token);
	});

	function getToken(): string | null {
		const storeToken = user.value?.token ?? null;

		return appLocalStorage.getItem(TOKEN_KEY) || storeToken;
	}

	async function login(payload: LoginPayload): Promise<void> {
		const res = await apiService.userLogin(payload);
		user.value = res;
	}

	function logout() {
		user.value = null;
		appLocalStorage.deleteItem(TOKEN_KEY);

		return navigateTo('/login');
	}

	return {
		user,
		login,
		logout,
		getToken,
		isAuthenticated
	};
});

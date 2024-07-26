import useApiService from '~/composables/useApiService';

export default defineNuxtRouteMiddleware(async () => {
	const apiService = useApiService();
	await apiService.checkAuth();
});

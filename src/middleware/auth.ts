import { useApiService } from '@/composables';

export default defineNuxtRouteMiddleware(async () => {
	const apiService = useApiService();
	await apiService.checkAuth();
});

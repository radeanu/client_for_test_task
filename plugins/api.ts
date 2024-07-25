export default defineNuxtPlugin({
	setup: () => {
		const api = $fetch.create({
			baseURL: useRuntimeConfig().public.API_BASE_URL,
			onRequest: (ctx) => {
				// if (localStorage) {
				// 	const token = localStorage.getItem('token');
				// 	console.log(token);
				// }
			},
			onResponse: async (ctx) => {
				if (ctx.response.status === 401) {
					await navigateTo('/login');
					return;
				}
			}
		});

		return {
			provide: { api }
		};
	}
});

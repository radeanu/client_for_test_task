// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: 'src/',
	nitro: {
		preset: 'node-server'
	},
	compatibilityDate: '2024-04-03',
	app: {
		baseURL: '/',
		head: {
			htmlAttrs: {
				lang: 'ru'
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1'
		}
	},
	modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxt/ui', '@nuxt/icon'],
	devtools: { enabled: true },
	colorMode: {
		preference: 'light'
	},
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.API_BASE_URL
		}
	}
});

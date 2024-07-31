<template>
	<div id="app-layout" class="w-screen w-dvw h-screen h-dvh m-0 overflow-auto">
		<div class="sticky top-0 bg-white z-50">
			<div
				class="flex justify-between gap-10 items-center h-14 px-[var(--layout-pad-x)] mx-auto max-w-7xl"
			>
				<UHorizontalNavigation
					:links="links"
					class="border-gray-200 dark:border-gray-800"
				/>

				<div class="flex flex-nowrap items-center gap-5">
					<ClientOnly>
						<UButton
							:icon="authLinkIcon"
							variant="outline"
							class="items-center justify-center"
							@click="handleAuthClick"
						/>
					</ClientOnly>

					<div id="header-actions" />
				</div>
			</div>

			<UDivider />
		</div>

		<div class="px-[var(--layout-pad-x)] my-8 mx-auto max-w-7xl">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const { isAuthenticated, logout } = useAuthStore();

const links = [
	{
		label: 'Главная',
		icon: 'i-heroicons-home',
		to: '/'
	},
	{
		label: 'Заметки',
		icon: 'i-heroicons:bookmark-16-solid',
		to: '/notes'
	}
];

const authLinkIcon = computed(() => {
	return isAuthenticated
		? 'i-heroicons:arrow-left-end-on-rectangle'
		: 'i-heroicons:arrow-right-end-on-rectangle';
});

function handleAuthClick() {
	return isAuthenticated ? logout() : navigateTo('/login');
}
</script>

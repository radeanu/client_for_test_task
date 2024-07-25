<template>
	<div class="w-screen w-dvw h-screen h-dvh m-0 overflow-auto">
		<div class="sticky top-0 bg-white">
			<UHorizontalNavigation :links="links" class="border-gray-200 dark:border-gray-800" />
			<UDivider />
		</div>

		<div class="px-[var(--layout-pad-x)] my-8">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
const links = [
	{
		label: 'Главная',
		icon: 'i-heroicons-home',
		to: '/'
	},
	{
		label: 'Заметки',
		icon: 'i-heroicons-chart-bar',
		to: '/notes'
	}
];
</script>

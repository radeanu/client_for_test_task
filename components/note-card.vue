<template>
	<UCard :ui="cardUi">
		<template #header>
			<div class="flex justify-between gap-3">
				<p class="min-w-80">{{ note.title }}</p>

				<div class="flex flex-nowrap justify-between gap-2 h-7">
					<UButton label="Edit" color="blue" />
					<UButton label="Delete" color="red" />
				</div>
			</div>
		</template>

		<p>{{ note.body }}</p>

		<template #footer>
			<small>{{ note.created_at }}</small>
		</template>
	</UCard>
</template>

<script setup lang="ts">
import type { Note } from '@/common/types';
defineProps<{ note: Note }>();

const cardUi = {
	header: {
		base: 'font-medium',
		padding: 'p-2 sm:px-2 sm:p-2 sm:pl-6'
	},
	footer: {
		base: 'font-light border-none',
		padding: 'py-0 pb-2'
	}
};
</script>

<template>
	<div>
		<div v-if="loading.isLoading.value" class="flex flex-wrap gap-2">
			<div class="w-full flex justify-between animate-pulse gap-2">
				<USkeleton class="h-6 w-[250px]" :ui="{ background: 'bg-gray-200' }" />

				<div class="flex gap-2">
					<USkeleton class="h-6 w-[50px]" :ui="{ background: 'bg-gray-200' }" />
					<USkeleton class="h-6 w-[50px]" :ui="{ background: 'bg-gray-200' }" />
				</div>
			</div>

			<USkeleton class="h-40 w-full animate-pulse" :ui="{ background: 'bg-gray-200' }" />
		</div>

		<div v-else class="flex flex-col gap-8">
			<NoteCard v-for="note in notes" :key="note.id" :note="note" />
		</div>
	</div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/note-card.vue';

import type { ApiNotesResult, Note, Pagination } from '@/common/types';
import useApiService from '@/common/useApiService';
import useLoading from '@/common/useLoading';

const apiService = useApiService();
const loading = useLoading();

useHead({
	title: 'Страница с заметками'
});

const notes = ref<Note[]>([]);
const pagination = ref<Pagination>({
	page: 1,
	count: 0,
	perPage: 10,
	next: 2,
	previous: null
});

onMounted(async () => {
	await loadNotes();
});

function transformNote(note: Note): Note {
	const formatter = new Intl.DateTimeFormat('ru', {});

	return {
		...note,
		created_at: formatter.format(new Date(note.created_at))
	};
}

async function loadNotes() {
	try {
		loading.start();
		if (!pagination.value.next) {
			return;
		}

		const res = await apiService.fetchNotes(pagination.value.page);

		const formattedResult = res.results.map((r) => transformNote(r));

		notes.value.push(...formattedResult);
	} catch (error) {
		console.log(error);
	} finally {
		loading.end();
	}
}
</script>

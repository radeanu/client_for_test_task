<template>
	<div>
		<div class="flex flex-col gap-8 mb-5">
			<NoteCard
				v-for="note in notesData.results"
				:key="note.id"
				:note="note"
				@update="handleNoteUpdate"
				@delete="handleNoteDelete"
			/>
		</div>

		<UButton
			v-if="showLoadMore"
			class="block mt-5 mx-auto"
			label="Загрузить еще ..."
			@click="loadNotes"
		/>

		<NoteSkeleton v-if="loading.isLoading.value" />

		<UModal v-model="createModal">
			<NoteForm
				title="Добавить заметку"
				submit-label="Добавить"
				@submit="handleCreateNote"
			/>
		</UModal>

		<ClientOnly>
			<Teleport v-if="isAuthenticated" to="#header-actions">
				<UButton
					class="w-44 justify-center"
					label="Добавить заметку"
					icon="i-heroicons:plus-20-solid"
					:loading="createLoader.isLoading.value"
					@click="createModal = true"
				/>
			</Teleport>
		</ClientOnly>
	</div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/note-card.vue';
import NoteForm from '@/components/note-form.vue';
import NoteSkeleton from '@/components/note-skeleton.vue';

import { useAuthStore } from '@/stores/auth';
import { useLoading, useApiService } from '@/composables';
import type { ApiNotesResult, BaseNote, Note } from '@/common/types';

const toast = useToast();
const loading = useLoading();
const createLoader = useLoading();
const apiService = useApiService();
const { isAuthenticated } = useAuthStore();

useHead({ title: 'Страница с заметками' });

const page = ref(0);
const createModal = ref(false);
const notesData = ref<ApiNotesResult>({
	count: 0,
	next: null,
	previous: null,
	results: []
});

const showLoadMore = computed(() => {
	if (loading.isLoading.value) return false;

	return notesData.value.results.length && notesData.value.next !== null;
});

onMounted(async () => {
	await loadNotes();
});

function handleNoteUpdate(note: Note) {
	const targetIndex = notesData.value.results.findIndex((n) => n.id === note.id);
	if (targetIndex === -1) return;

	notesData.value.results[targetIndex] = note;
}

function handleNoteDelete(id: number) {
	notesData.value.results = notesData.value.results.filter((v) => v.id !== id);
}

async function handleCreateNote(note: BaseNote) {
	try {
		createModal.value = false;
		createLoader.start();

		const res = await apiService.postCreateNote(note);

		notesData.value.results.unshift(res);
	} catch (error) {
		console.error(error);
		toast.add({ title: 'Произошла ошибка', color: 'red', timeout: 2000 });
	} finally {
		createLoader.end();
	}
}

async function loadNotes() {
	try {
		loading.start();

		page.value += 1;
		const res = await apiService.fetchNotes(page.value);

		const notesList = [...notesData.value.results, ...res.results].sort((a, b) => {
			return new Date(a.created_at) > new Date(b.created_at) ? 1 : -1;
		});

		notesData.value = { ...res, results: notesList };
	} catch (error) {
		console.error(error);
		toast.add({ title: 'Произошла ошибка', color: 'red', timeout: 2000 });
	} finally {
		loading.end();
	}
}
</script>

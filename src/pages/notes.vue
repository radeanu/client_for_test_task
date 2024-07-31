<template>
	<div>
		<div class="flex flex-col gap-8 mb-5">
			<NoteCard
				v-for="note in notesList"
				:key="note.id"
				:note="note"
				@update="handleNoteUpdate"
				@delete="handleNoteDelete"
			/>
		</div>

		<NuxtLink v-if="showMoreBtn" :to="{ name: 'notes', query: { page: page + 1 } }">
			<UButton class="block mt-5 mx-auto" label="Загрузить еще ..." />
		</NuxtLink>

		<NoteSkeleton v-if="loadingStatus === 'pending'" />

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
import { useNotesPage } from '@/composables/useNotesPage';

const { isAuthenticated } = useAuthStore();

useHead({ title: 'Страница с заметками' });

const {
	page,
	notesList,
	createModal,
	showMoreBtn,
	createLoader,
	loadingStatus,
	handleCreateNote,
	handleNoteDelete,
	handleNoteUpdate
} = await useNotesPage();
</script>

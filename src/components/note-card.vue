<template>
	<UCard :ui="noteCardUi">
		<template #header>
			<div class="flex justify-between gap-3">
				<p class="min-w-80">{{ note.title }}</p>

				<div
					v-if="isAuthenticated"
					class="flex flex-nowrap justify-between gap-2 h-7"
				>
					<UButton
						icon="i-heroicons:pencil-square-16-solid"
						color="sky"
						:loading="editLoader.isLoading.value"
						@click="handleEditClick"
					/>
					<UButton
						icon="i-heroicons:trash-solid"
						color="red"
						:loading="deleteLoader.isLoading.value"
						@click="handleDeleteClick"
					/>
				</div>
			</div>
		</template>

		<p>{{ note.body }}</p>

		<template #footer>
			<div
				class="flex flex-nowrap justify-between gap-2 text-sm font-medium text-gray-500"
			>
				<span>#{{ note.id }}</span>
				<span>{{ createdAt }}</span>
			</div>
		</template>

		<UModal v-model="editModal">
			<NoteForm
				title="Редактировать заметку"
				submit-label="Сохранить"
				:note="noteToEdit"
				@submit="handleUpdateNote"
			/>
		</UModal>
	</UCard>
</template>

<script setup lang="ts">
import ConfirmModal from './confirm-modal.vue';

import { useAuthStore } from '@/stores/auth';
import { dateFormatter, noteCardUi } from '@/common';
import type { Note, BaseNote } from '@/common/types';
import { useLoading, useApiService } from '@/composables';

interface Emits {
	(e: 'delete', id: number): void;
	(e: 'update', note: Note): void;
}

interface Props {
	note: Note;
}

const $emit = defineEmits<Emits>();
const props = defineProps<Props>();

const toast = useToast();
const modal = useModal();
const editLoader = useLoading();
const deleteLoader = useLoading();
const apiService = useApiService();
const { isAuthenticated } = useAuthStore();

const editModal = ref(false);
const noteToEdit = ref<Note>();

const createdAt = computed(() => {
	return dateFormatter.format(new Date(props.note.created_at));
});

function handleDeleteClick() {
	modal.open(ConfirmModal, {
		async onSubmit(value) {
			modal.reset();
			if (!value) return;

			await handleDeleteNote();
		}
	});
}

async function handleEditClick() {
	try {
		editLoader.start();

		const res = await apiService.getNoteById(props.note.id);
		noteToEdit.value = res;
		editModal.value = true;
	} catch (error) {
		console.log(error);
		toast.add({ title: 'Произошла ошибка', color: 'red', timeout: 2000 });
	} finally {
		editLoader.end();
	}
}

async function handleUpdateNote(note: BaseNote) {
	try {
		editModal.value = false;
		editLoader.start();

		const res = await apiService.postUpdateNote(props.note.id, note);
		$emit('update', res);
	} catch (error) {
		console.log(error);
		toast.add({ title: 'Произошла ошибка', color: 'red', timeout: 2000 });
	} finally {
		editLoader.end();
	}
}

async function handleDeleteNote() {
	try {
		deleteLoader.start();

		await apiService.postDeleteNote(props.note.id);
		$emit('delete', props.note.id);
	} catch (error) {
		console.log(error);
		toast.add({ title: 'Произошла ошибка', color: 'red', timeout: 2000 });
	} finally {
		deleteLoader.end();
	}
}
</script>
~/composables/useLoading~/composables/useApiService

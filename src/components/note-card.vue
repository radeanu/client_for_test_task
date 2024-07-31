<template>
	<UCard :ui="noteCardUi">
		<template #header>
			<div class="flex justify-between gap-3">
				<p class="min-w-80">{{ titleValue }}</p>

				<ClientOnly>
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
				</ClientOnly>
			</div>
		</template>

		<p>{{ bodyValue }}</p>

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
import { formatDateStr, normalizeContent } from '@/common';
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
const noteCardUi = {
	header: {
		base: 'font-medium',
		padding: 'p-2 sm:px-2 sm:p-2 sm:pl-6'
	},
	footer: {
		base: 'font-light border-none',
		padding: 'py-0 pb-6'
	}
};

const createdAt = computed(() => formatDateStr(props.note.created_at));
const bodyValue = computed(() => normalizeContent(props.note.body));
const titleValue = computed(() => normalizeContent(props.note.title));

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
		console.error(error);
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
		console.error(error);
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
		console.error(error);
		toast.add({ title: 'Произошла ошибка', color: 'red', timeout: 2000 });
	} finally {
		deleteLoader.end();
	}
}
</script>

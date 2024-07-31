import { useLoading, useApiService } from '@/composables';
import type { BaseNote, Note } from '@/common/types';

export async function useNotesPage() {
	const route = useRoute();
	const toast = useToast();
	const createLoader = useLoading();
	const apiService = useApiService();

	const createModal = ref(false);
	const notesList = ref<Note[]>([]);

	const page = computed(() => {
		const val = route.query?.page as string | undefined;
		return val ? +val : 1;
	});

	const {
		data: ssrData,
		status: loadingStatus,
		refresh
	} = await useAsyncData('notes', () => apiService.fetchNotes(page.value), {
		watch: [page]
	});

	const showMoreBtn = computed(() => {
		if (loadingStatus.value === 'pending') return false;

		return !!ssrData?.value?.next;
	});

	watchEffect(() => {
		const ssrList = ssrData.value?.results ?? [];
		notesList.value.push(...ssrList);
	});

	function handleNoteUpdate(note: Note) {
		const targetIndex = notesList.value.findIndex((n) => n.id === note.id);
		if (targetIndex === -1) return;

		notesList.value[targetIndex] = note;
	}

	function handleNoteDelete(id: number) {
		notesList.value = notesList.value.filter((v) => v.id !== id);
	}

	async function handleCreateNote(note: BaseNote) {
		try {
			createModal.value = false;
			createLoader.start();

			await apiService.postCreateNote(note);
			await refresh();
		} catch (error) {
			console.error(error);
			toast.add({ title: 'Произошла ошибка', color: 'red', timeout: 2000 });
		} finally {
			createLoader.end();
		}
	}

	return {
		page,
		notesList,
		createModal,
		showMoreBtn,
		createLoader,
		loadingStatus,
		handleNoteUpdate,
		handleNoteDelete,
		handleCreateNote
	};
}

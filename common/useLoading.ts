export default function () {
	const loading = ref(0);
	const title = ref<string>();

	const isLoading = computed(() => loading.value > 0);

	function start(text?: string) {
		loading.value += 1;
		title.value = text;
	}

	function end() {
		if (loading.value === 0) return;

		setTimeout(() => {
			loading.value -= 1;
		}, 300);
	}

	return {
		end,
		start,
		title: readonly(title),
		isLoading: readonly(isLoading)
	};
}

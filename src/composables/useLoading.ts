export function useLoading() {
	const loading = ref(0);

	const isLoading = computed(() => loading.value > 0);

	function start() {
		loading.value += 1;
	}

	function end(timeout = 300) {
		if (loading.value === 0) return;

		setTimeout(() => {
			loading.value -= 1;
		}, timeout);
	}

	return {
		end,
		start,
		isLoading: readonly(isLoading)
	};
}

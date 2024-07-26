export function useLocalStorage() {
	function getItem(name: string) {
		if (!import.meta.client) return null;

		return localStorage.getItem(name);
	}

	function setItem(name: string, value: unknown) {
		if (!import.meta.client) return;

		if (name === undefined || value === undefined) {
			return;
		}

		const val = typeof value === 'object' ? JSON.stringify(value) : (value as string);

		localStorage.setItem(name, val);
	}

	function deleteItem(name: string) {
		if (!import.meta.client) return;

		localStorage.removeItem(name);
	}

	return {
		getItem,
		setItem,
		deleteItem
	};
}

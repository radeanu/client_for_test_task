export default function () {
	function getItem(name: string) {
		return localStorage.getItem(name);
	}

	function setItem(name: string, value: string) {
		const val = typeof value === 'object' ? JSON.stringify(value) : value;
		localStorage.setItem(name, val);
	}

	function deleteItem(name: string) {
		localStorage.removeItem(name);
	}

	return {
		getItem,
		setItem,
		deleteItem
	};
}

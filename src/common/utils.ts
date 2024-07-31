export const dateFormatter = new Intl.DateTimeFormat('ru', {
	minute: '2-digit',
	hour: '2-digit',
	day: '2-digit',
	month: '2-digit',
	year: 'numeric'
});

export function formatDateStr(date: string) {
	return dateFormatter.format(new Date(date));
}

export function normalizeContent(content: string) {
	return content.replace(/\r\n/g, '\n');
}

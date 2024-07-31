import type { Paginator } from '@/server/types';

export function paginateDocs<T>(docs: T[], page = 1, limit = 10) {
	const skip = page ? page - 1 : 0;
	const offset = skip * limit;

	const count = docs.length;
	const currentPage = Math.ceil((offset + 1) / limit);
	const total_pages = limit > 0 ? Math.ceil(count / limit) || 1 : null;

	const slicesDocs = limit < 0 ? docs : docs.slice(offset, offset + limit);

	const paginator: Paginator<T> = {
		count,
		previous: currentPage > 1 ? currentPage - 1 : null,
		next: total_pages && currentPage < total_pages ? currentPage + 1 : null,
		results: slicesDocs
	};

	return paginator;
}

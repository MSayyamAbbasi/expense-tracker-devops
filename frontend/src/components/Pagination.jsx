import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination bar with previous/next controls and numbered page buttons.
 * Collapses to a condensed set of page numbers around the current page.
 */
const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages, total, limit } = pagination;

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 1);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i += 1) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  const rangeStart = (page - 1) * limit + 1;
  const rangeEnd = Math.min(page * limit, total);

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-1 pt-4 sm:flex-row">
      <p className="text-xs text-slate-500">
        Showing <span className="font-medium text-slate-700">{rangeStart}-{rangeEnd}</span> of{' '}
        <span className="font-medium text-slate-700">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getPageNumbers().map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-sm text-slate-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === page ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

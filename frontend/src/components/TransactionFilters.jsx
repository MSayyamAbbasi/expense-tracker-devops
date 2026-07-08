import { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';
import useDebounce from '../hooks/useDebounce';

const TYPE_OPTIONS = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

/**
 * Search + filter controls for the transactions table: free-text search
 * (debounced), type, category, and a date range.
 */
const TransactionFilters = ({ filters, onChange, onReset }) => {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 400);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onChange({ search: debouncedSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const hasActiveFilters =
    filters.type || filters.category || filters.startDate || filters.endDate || filters.search;

  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search notes..."
            className="input-field pl-9"
          />
        </div>

        <select
          value={filters.type}
          onChange={(e) => onChange({ type: e.target.value })}
          className="input-field sm:w-40"
        >
          <option value="">All types</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="input-field sm:w-44"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setShowMore((s) => !s)}
          className="btn-secondary sm:w-auto"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Dates
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearchInput('');
              onReset();
            }}
            className="btn-ghost sm:w-auto"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {showMore && (
        <div className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <label className="label-text">From</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onChange({ startDate: e.target.value })}
              className="input-field"
            />
          </div>
          <div className="flex-1">
            <label className="label-text">To</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onChange({ endDate: e.target.value })}
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;

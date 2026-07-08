import { Pencil, Trash2, Receipt } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import EmptyState from './EmptyState';
import Loader from './Loader';
import { formatCurrency, formatDate } from '../utils/constants';

/**
 * Table of transactions with edit/delete actions per row.
 * Renders as a table on larger screens and stacked cards on mobile.
 */
const TransactionTable = ({ transactions, loading, onEdit, onDelete }) => {
  if (loading) return <Loader />;

  if (!transactions.length) {
    return (
      <EmptyState
        icon={Receipt}
        title="No transactions found"
        description="Try adjusting your filters, or add a new transaction to get started."
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Category</th>
              <th className="pb-3 pr-4">Note</th>
              <th className="pb-3 pr-4 text-right">Amount</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <tr key={tx._id} className="group text-sm">
                <td className="whitespace-nowrap py-3 pr-4 text-slate-500">{formatDate(tx.date)}</td>
                <td className="py-3 pr-4">
                  <CategoryBadge category={tx.category} />
                </td>
                <td className="max-w-xs truncate py-3 pr-4 text-slate-600">{tx.note || '—'}</td>
                <td
                  className={`py-3 pr-4 text-right font-semibold ${
                    tx.type === 'income' ? 'text-income-600' : 'text-expense-600'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </td>
                <td className="py-3 pl-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => onEdit(tx)}
                      aria-label="Edit transaction"
                      className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(tx)}
                      aria-label="Delete transaction"
                      className="rounded-lg p-2 text-slate-400 hover:bg-expense-50 hover:text-expense-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {transactions.map((tx) => (
          <div key={tx._id} className="rounded-xl border border-slate-100 p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-900">{tx.note || tx.category}</p>
                <p className="mt-0.5 text-xs text-slate-400">{formatDate(tx.date)}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  tx.type === 'income' ? 'text-income-600' : 'text-expense-600'
                }`}
              >
                {tx.type === 'income' ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <CategoryBadge category={tx.category} />
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(tx)}
                  aria-label="Edit transaction"
                  className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(tx)}
                  aria-label="Delete transaction"
                  className="rounded-lg p-2 text-slate-400 hover:bg-expense-50 hover:text-expense-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionTable;

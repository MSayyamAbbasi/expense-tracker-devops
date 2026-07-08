import { Receipt } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import EmptyState from './EmptyState';
import { formatCurrency, formatDate } from '../utils/constants';

/**
 * Compact list of the most recent transactions, shown on the dashboard
 * as a quick-glance preview (full history lives on the Transactions page).
 */
const RecentTransactionsList = ({ transactions = [] }) => {
  if (!transactions.length) {
    return (
      <EmptyState
        icon={Receipt}
        title="No transactions yet"
        description="Transactions you add will show up here."
      />
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {transactions.map((tx) => (
        <li key={tx._id} className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-ink-900">{tx.note || tx.category}</p>
              <div className="mt-1 flex items-center gap-2">
                <CategoryBadge category={tx.category} />
                <span className="text-xs text-slate-400">{formatDate(tx.date)}</span>
              </div>
            </div>
          </div>
          <span
            className={`shrink-0 text-sm font-semibold ${
              tx.type === 'income' ? 'text-income-600' : 'text-expense-600'
            }`}
          >
            {tx.type === 'income' ? '+' : '-'}
            {formatCurrency(tx.amount)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RecentTransactionsList;

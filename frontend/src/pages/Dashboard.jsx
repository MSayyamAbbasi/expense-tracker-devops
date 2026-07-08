import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import MonthlySummaryChart from '../components/MonthlySummaryChart';
import CategoryBreakdownChart from '../components/CategoryBreakdownChart';
import RecentTransactionsList from '../components/RecentTransactionsList';
import Loader from '../components/Loader';
import Button from '../components/Button';
import TransactionModal from '../components/TransactionModal';
import dashboardService from '../services/dashboardService';
import transactionService from '../services/transactionService';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import { formatCurrency } from '../utils/constants';

const Dashboard = () => {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadSummary = async () => {
    try {
      const data = await dashboardService.getSummary(6);
      setSummary(data);
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTransaction = async (payload) => {
    setSubmitting(true);
    try {
      await transactionService.createTransaction(payload);
      success('Transaction added successfully');
      setModalOpen(false);
      loadSummary();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to add transaction');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen label="Loading your dashboard…" />;

  const currency = user?.currency || 'USD';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink-900">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">Here&apos;s how your money is moving this month.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} icon={Plus}>
          Add transaction
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard
          label="Total Income"
          value={formatCurrency(summary?.totalIncome, currency)}
          icon={TrendingUp}
          tone="income"
        />
        <StatsCard
          label="Total Expense"
          value={formatCurrency(summary?.totalExpense, currency)}
          icon={TrendingDown}
          tone="expense"
        />
        <StatsCard
          label="Current Balance"
          value={formatCurrency(summary?.balance, currency)}
          icon={Wallet}
          tone="balance"
          subtitle={summary?.balance >= 0 ? 'You are in the green' : 'Spending exceeds income'}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h3 className="mb-1 text-base font-semibold text-ink-900">Monthly Summary</h3>
          <p className="mb-4 text-xs text-slate-400">Income vs. expense over the last 6 months</p>
          <MonthlySummaryChart data={summary?.monthlySummary || []} />
        </div>

        <div className="card">
          <h3 className="mb-1 text-base font-semibold text-ink-900">Expense Breakdown</h3>
          <p className="mb-4 text-xs text-slate-400">By category</p>
          <CategoryBreakdownChart data={summary?.categoryBreakdown || []} />
        </div>
      </div>

      <div className="card">
        <h3 className="mb-3 text-base font-semibold text-ink-900">Recent Transactions</h3>
        <RecentTransactionsList transactions={summary?.recentTransactions || []} />
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddTransaction}
        submitting={submitting}
      />
    </div>
  );
};

export default Dashboard;

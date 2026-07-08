import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/Button';
import TransactionFilters from '../components/TransactionFilters';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';
import useTransactions from '../hooks/useTransactions';
import useToast from '../hooks/useToast';

const Transactions = () => {
  const {
    transactions,
    pagination,
    filters,
    loading,
    setPage,
    updateFilters,
    resetFilters,
    addTransaction,
    editTransaction,
    removeTransaction,
  } = useTransactions();
  const { success, error: toastError } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const openAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editingTransaction) {
        await editTransaction(editingTransaction._id, payload);
        success('Transaction updated successfully');
      } else {
        await addTransaction(payload);
        success('Transaction added successfully');
      }
      setModalOpen(false);
      setEditingTransaction(null);
    } catch (err) {
      toastError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingTransaction) return;
    setDeleting(true);
    try {
      await removeTransaction(deletingTransaction._id);
      success('Transaction deleted');
      setDeletingTransaction(null);
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to delete transaction');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink-900">Transactions</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {pagination.total} total transaction{pagination.total === 1 ? '' : 's'}
          </p>
        </div>
        <Button onClick={openAddModal} icon={Plus}>
          Add transaction
        </Button>
      </div>

      <div className="card">
        <TransactionFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />
        <TransactionTable
          transactions={transactions}
          loading={loading}
          onEdit={openEditModal}
          onDelete={setDeletingTransaction}
        />
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      <TransactionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTransaction(null);
        }}
        initialData={editingTransaction}
        onSubmit={handleSubmit}
        submitting={submitting}
      />

      <ConfirmDialog
        isOpen={Boolean(deletingTransaction)}
        onClose={() => setDeletingTransaction(null)}
        onConfirm={handleDelete}
        title="Delete transaction"
        description={`This will permanently delete "${
          deletingTransaction?.note || deletingTransaction?.category
        }". This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
};

export default Transactions;

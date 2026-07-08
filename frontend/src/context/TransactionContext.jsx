import { createContext, useState, useCallback, useEffect } from 'react';
import transactionService from '../services/transactionService';

export const TransactionContext = createContext(null);

const DEFAULT_FILTERS = {
  search: '',
  type: '',
  category: '',
  startDate: '',
  endDate: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Strip empty-string filters so they aren't sent as query params
      const params = { page, limit: pagination.limit };
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });

      const result = await transactionService.getTransactions(params);
      setTransactions(result.transactions);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [page, filters, pagination.limit]);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters, refreshFlag]);

  const refresh = useCallback(() => setRefreshFlag((f) => f + 1), []);

  const updateFilters = useCallback((partialFilters) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...partialFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  }, []);

  const addTransaction = useCallback(
    async (payload) => {
      const transaction = await transactionService.createTransaction(payload);
      refresh();
      return transaction;
    },
    [refresh]
  );

  const editTransaction = useCallback(
    async (id, updates) => {
      const transaction = await transactionService.updateTransaction(id, updates);
      refresh();
      return transaction;
    },
    [refresh]
  );

  const removeTransaction = useCallback(
    async (id) => {
      await transactionService.deleteTransaction(id);
      refresh();
    },
    [refresh]
  );

  const value = {
    transactions,
    pagination,
    filters,
    page,
    loading,
    error,
    setPage,
    updateFilters,
    resetFilters,
    addTransaction,
    editTransaction,
    removeTransaction,
    refresh,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

import api from './api';

const transactionService = {
  getTransactions: async (params = {}) => {
    const { data } = await api.get('/transactions', { params });
    return data.data;
  },

  getCategories: async () => {
    const { data } = await api.get('/transactions/categories');
    return data.data.categories;
  },

  getTransaction: async (id) => {
    const { data } = await api.get(`/transactions/${id}`);
    return data.data.transaction;
  },

  createTransaction: async (payload) => {
    const { data } = await api.post('/transactions', payload);
    return data.data.transaction;
  },

  updateTransaction: async (id, updates) => {
    const { data } = await api.patch(`/transactions/${id}`, updates);
    return data.data.transaction;
  },

  deleteTransaction: async (id) => {
    const { data } = await api.delete(`/transactions/${id}`);
    return data;
  },
};

export default transactionService;

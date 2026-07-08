const Transaction = require('../models/Transaction');
const ApiError = require('../utils/ApiError');

/**
 * Builds a Mongo filter object from query params, scoped to a user.
 */
const buildFilter = (userId, query) => {
  const filter = { user: userId };

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) filter.date.$lte = new Date(query.endDate);
  }

  if (query.search) {
    filter.note = { $regex: query.search, $options: 'i' };
  }

  return filter;
};

/**
 * Lists transactions for a user with search, filter, and pagination applied.
 */
const listTransactions = async (userId, query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const filter = buildFilter(userId, query);

  const sortField = query.sortBy || 'date';
  const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

  const [transactions, total] = await Promise.all([
    Transaction.find(filter)
      .sort({ [sortField]: sortOrder, _id: -1 })
      .skip(skip)
      .limit(limit),
    Transaction.countDocuments(filter),
  ]);

  return {
    transactions,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      hasNextPage: skip + transactions.length < total,
      hasPrevPage: page > 1,
    },
  };
};

const getTransactionById = async (userId, transactionId) => {
  const transaction = await Transaction.findOne({ _id: transactionId, user: userId });
  if (!transaction) {
    throw ApiError.notFound('Transaction not found');
  }
  return transaction;
};

const createTransaction = async (userId, payload) => {
  const transaction = await Transaction.create({ ...payload, user: userId });
  return transaction;
};

const updateTransaction = async (userId, transactionId, updates) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: transactionId, user: userId },
    updates,
    { new: true, runValidators: true }
  );

  if (!transaction) {
    throw ApiError.notFound('Transaction not found');
  }

  return transaction;
};

const deleteTransaction = async (userId, transactionId) => {
  const transaction = await Transaction.findOneAndDelete({ _id: transactionId, user: userId });
  if (!transaction) {
    throw ApiError.notFound('Transaction not found');
  }
  return transaction;
};

module.exports = {
  listTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

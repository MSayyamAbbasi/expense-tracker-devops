const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const transactionService = require('../services/transactionService');
const Transaction = require('../models/Transaction');

/**
 * @route   GET /api/transactions
 * @access  Private
 * Supports: ?page=&limit=&type=&category=&startDate=&endDate=&search=&sortBy=&sortOrder=
 */
const getTransactions = asyncHandler(async (req, res) => {
  const { transactions, pagination } = await transactionService.listTransactions(
    req.user._id,
    req.query
  );

  return new ApiResponse(200, 'Transactions fetched successfully', {
    transactions,
    pagination,
  }).send(res);
});

/**
 * @route   GET /api/transactions/categories
 * @access  Private
 */
const getCategories = asyncHandler(async (req, res) => {
  return new ApiResponse(200, 'Categories fetched successfully', {
    categories: Transaction.CATEGORIES,
  }).send(res);
});

/**
 * @route   GET /api/transactions/:id
 * @access  Private
 */
const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.getTransactionById(req.user._id, req.params.id);
  return new ApiResponse(200, 'Transaction fetched successfully', { transaction }).send(res);
});

/**
 * @route   POST /api/transactions
 * @access  Private
 */
const createTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.createTransaction(req.user._id, req.body);
  return new ApiResponse(201, 'Transaction created successfully', { transaction }).send(res);
});

/**
 * @route   PATCH /api/transactions/:id
 * @access  Private
 */
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await transactionService.updateTransaction(
    req.user._id,
    req.params.id,
    req.body
  );
  return new ApiResponse(200, 'Transaction updated successfully', { transaction }).send(res);
});

/**
 * @route   DELETE /api/transactions/:id
 * @access  Private
 */
const deleteTransaction = asyncHandler(async (req, res) => {
  await transactionService.deleteTransaction(req.user._id, req.params.id);
  return new ApiResponse(200, 'Transaction deleted successfully', null).send(res);
});

module.exports = {
  getTransactions,
  getCategories,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

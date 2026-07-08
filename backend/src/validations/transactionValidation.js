const { body, param, query } = require('express-validator');
const Transaction = require('../models/Transaction');

const CATEGORIES = Transaction.CATEGORIES;

const createTransactionValidation = [
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['income', 'expense'])
    .withMessage('Type must be either "income" or "expense"'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(CATEGORIES)
    .withMessage(`Category must be one of: ${CATEGORIES.join(', ')}`),
  body('note')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Note cannot exceed 500 characters'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid date'),
];

const updateTransactionValidation = [
  param('id').isMongoId().withMessage('Invalid transaction id'),
  body('type')
    .optional()
    .isIn(['income', 'expense'])
    .withMessage('Type must be either "income" or "expense"'),
  body('amount')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .optional()
    .isIn(CATEGORIES)
    .withMessage(`Category must be one of: ${CATEGORIES.join(', ')}`),
  body('note')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Note cannot exceed 500 characters'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid date'),
];

const idParamValidation = [param('id').isMongoId().withMessage('Invalid transaction id')];

const listTransactionsValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('type').optional().isIn(['income', 'expense']).withMessage('Invalid type filter'),
  query('category').optional().isIn(CATEGORIES).withMessage('Invalid category filter'),
  query('startDate').optional().isISO8601().withMessage('startDate must be a valid date'),
  query('endDate').optional().isISO8601().withMessage('endDate must be a valid date'),
];

module.exports = {
  createTransactionValidation,
  updateTransactionValidation,
  idParamValidation,
  listTransactionsValidation,
};

const mongoose = require('mongoose');

const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Salary',
  'Entertainment',
  'Health',
  'Education',
  'Other',
];

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: {
        values: ['income', 'expense'],
        message: 'Type must be either "income" or "expense"',
      },
      required: [true, 'Transaction type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message: 'Invalid category',
      },
      required: [true, 'Category is required'],
    },
    note: {
      type: String,
      trim: true,
      maxlength: [500, 'Note cannot exceed 500 characters'],
      default: '',
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Common query patterns: list by user sorted by date, and filter by category/type
transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, category: 1 });
transactionSchema.index({ user: 1, type: 1 });

transactionSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Transaction', transactionSchema);

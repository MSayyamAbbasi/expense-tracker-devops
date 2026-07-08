const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

/**
 * Computes overall totals (income, expense, balance) for a user.
 */
const getOverallSummary = async (userId) => {
  const results = await Transaction.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' },
      },
    },
  ]);

  const totals = { income: 0, expense: 0 };
  results.forEach((r) => {
    totals[r._id] = r.total;
  });

  return {
    totalIncome: totals.income,
    totalExpense: totals.expense,
    balance: totals.income - totals.expense,
  };
};

/**
 * Computes month-by-month income/expense totals for the last N months (default 6).
 */
const getMonthlySummary = async (userId, months = 6) => {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - (months - 1));
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const results = await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type',
        },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  // Build a map keyed by "YYYY-M" so we can fill in months with no data
  const map = {};
  results.forEach((r) => {
    const key = `${r._id.year}-${r._id.month}`;
    if (!map[key]) map[key] = { income: 0, expense: 0 };
    map[key][r._id.type] = r.total;
  });

  const monthlyData = [];
  const cursor = new Date(startDate);
  for (let i = 0; i < months; i += 1) {
    const key = `${cursor.getFullYear()}-${cursor.getMonth() + 1}`;
    const entry = map[key] || { income: 0, expense: 0 };
    monthlyData.push({
      label: cursor.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      year: cursor.getFullYear(),
      month: cursor.getMonth() + 1,
      income: entry.income,
      expense: entry.expense,
      balance: entry.income - entry.expense,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return monthlyData;
};

/**
 * Computes expense breakdown by category (for pie/donut charts).
 */
const getCategoryBreakdown = async (userId, type = 'expense') => {
  const results = await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        type,
      },
    },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { total: -1 } },
  ]);

  return results.map((r) => ({
    category: r._id,
    total: r.total,
    count: r.count,
  }));
};

/**
 * Returns the most recent transactions for a quick dashboard preview.
 */
const getRecentTransactions = async (userId, limit = 5) => {
  return Transaction.find({ user: userId }).sort({ date: -1, _id: -1 }).limit(limit);
};

module.exports = {
  getOverallSummary,
  getMonthlySummary,
  getCategoryBreakdown,
  getRecentTransactions,
};

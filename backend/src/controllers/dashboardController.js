const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const dashboardService = require('../services/dashboardService');

/**
 * @route   GET /api/dashboard/summary
 * @access  Private
 * Returns total income, total expense, current balance, monthly summary,
 * category breakdown, and recent transactions in a single payload for
 * the dashboard view.
 */
const getSummary = asyncHandler(async (req, res) => {
  const months = parseInt(req.query.months, 10) || 6;

  const [overall, monthlySummary, categoryBreakdown, recentTransactions] = await Promise.all([
    dashboardService.getOverallSummary(req.user._id),
    dashboardService.getMonthlySummary(req.user._id, months),
    dashboardService.getCategoryBreakdown(req.user._id, 'expense'),
    dashboardService.getRecentTransactions(req.user._id, 5),
  ]);

  return new ApiResponse(200, 'Dashboard summary fetched successfully', {
    ...overall,
    monthlySummary,
    categoryBreakdown,
    recentTransactions,
  }).send(res);
});

module.exports = { getSummary };

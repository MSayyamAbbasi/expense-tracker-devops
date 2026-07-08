/**
 * Wraps an async route handler / middleware and forwards any rejected
 * promise to Express's `next`, so centralized error middleware can handle it.
 *
 * Usage:
 *   router.get('/', asyncHandler(async (req, res) => { ... }));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

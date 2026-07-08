const env = require('../config/env');
const ApiError = require('../utils/ApiError');

/**
 * Normalizes a variety of error types (ApiError, Mongoose errors,
 * JWT errors, etc.) into a consistent { success, message, errors } shape,
 * then sends the response with the appropriate HTTP status code.
 *
 * Must be registered LAST, after all routes, with 4 arguments so
 * Express recognizes it as error-handling middleware.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Convert known non-ApiError exceptions into ApiError instances
  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';
    let errors = [];

    // Mongoose invalid ObjectId
    if (error.name === 'CastError') {
      statusCode = 400;
      message = `Invalid value for field "${error.path}"`;
    }

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      statusCode = 400;
      message = 'Validation failed';
      errors = Object.values(error.errors).map((e) => ({
        field: e.path,
        message: e.message,
      }));
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue || {})[0] || 'field';
      message = `${field} already exists`;
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    }
    if (error.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token has expired';
    }

    error = new ApiError(statusCode, message, errors);
  }

  if (env.NODE_ENV === 'development') {
    console.error(`[Error] ${req.method} ${req.originalUrl} ->`, err);
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    errors: error.errors && error.errors.length ? error.errors : undefined,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;

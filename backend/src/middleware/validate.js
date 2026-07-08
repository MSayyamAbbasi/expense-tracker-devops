const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Runs after express-validator's validation chains have executed.
 * If any validation failed, formats the errors and throws a 400 ApiError.
 * Place this middleware after the validation chain array in the route definition.
 */
const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  throw ApiError.badRequest('Validation failed', errors);
};

module.exports = validate;

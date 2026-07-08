const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Protects routes by verifying the Bearer JWT sent in the Authorization header.
 * Attaches the authenticated user document (minus password) to req.user.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw ApiError.unauthorized('Not authorized, no token provided');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    throw ApiError.unauthorized('Not authorized, token is invalid or expired');
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw ApiError.unauthorized('Not authorized, user no longer exists');
  }

  req.user = user;
  next();
});

module.exports = { protect };

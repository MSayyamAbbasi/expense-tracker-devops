const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Signs a JWT for the given user id.
 * @param {string} userId - Mongo ObjectId of the authenticated user
 * @returns {string} signed JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

module.exports = generateToken;

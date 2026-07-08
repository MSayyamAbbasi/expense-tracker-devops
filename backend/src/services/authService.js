const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const generateToken = require('../utils/generateToken');

/**
 * Registers a new user account.
 * @param {{name: string, email: string, password: string}} payload
 * @returns {Promise<{user: object, token: string}>}
 */
const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict('An account with this email already exists');
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return { user, token };
};

/**
 * Authenticates a user with email + password.
 * @param {{email: string, password: string}} payload
 * @returns {Promise<{user: object, token: string}>}
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { registerUser, loginUser };

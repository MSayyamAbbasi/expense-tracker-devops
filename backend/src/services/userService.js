const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/**
 * Updates allowed profile fields for a user.
 * @param {string} userId
 * @param {{name?: string, email?: string, currency?: string}} updates
 */
const updateProfile = async (userId, updates) => {
  const allowedFields = ['name', 'email', 'currency'];
  const sanitized = {};

  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) sanitized[field] = updates[field];
  });

  if (sanitized.email) {
    const existing = await User.findOne({ email: sanitized.email, _id: { $ne: userId } });
    if (existing) {
      throw ApiError.conflict('This email is already in use by another account');
    }
  }

  const user = await User.findByIdAndUpdate(userId, sanitized, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  return user;
};

/**
 * Changes a user's password after verifying the current one.
 * @param {string} userId
 * @param {string} currentPassword
 * @param {string} newPassword
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw ApiError.notFound('User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.badRequest('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  return user;
};

module.exports = { updateProfile, changePassword };

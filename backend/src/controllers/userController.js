const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const userService = require('../services/userService');

/**
 * @route   PATCH /api/users/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user._id, req.body);
  return new ApiResponse(200, 'Profile updated successfully', { user }).send(res);
});

/**
 * @route   PATCH /api/users/password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await userService.changePassword(req.user._id, currentPassword, newPassword);
  return new ApiResponse(200, 'Password changed successfully', null).send(res);
});

module.exports = { updateProfile, changePassword };

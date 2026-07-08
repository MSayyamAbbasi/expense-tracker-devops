const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/authService');

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.registerUser({ name, email, password });

  return new ApiResponse(201, 'Account created successfully', { user, token }).send(res);
});

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser({ email, password });

  return new ApiResponse(200, 'Logged in successfully', { user, token }).send(res);
});

/**
 * @route   POST /api/auth/logout
 * @access  Private
 * Since JWTs are stateless, logout is handled client-side by discarding
 * the token. This endpoint exists for API completeness / future
 * blacklisting support and always succeeds.
 */
const logout = asyncHandler(async (req, res) => {
  return new ApiResponse(200, 'Logged out successfully', null).send(res);
});

/**
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  return new ApiResponse(200, 'Current user fetched', { user: req.user }).send(res);
});

module.exports = { register, login, logout, getMe };

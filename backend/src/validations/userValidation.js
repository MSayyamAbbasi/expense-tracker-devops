const { body } = require('express-validator');

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 60 })
    .withMessage('Name cannot exceed 60 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('currency')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Invalid currency code'),
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
];

module.exports = { updateProfileValidation, changePasswordValidation };

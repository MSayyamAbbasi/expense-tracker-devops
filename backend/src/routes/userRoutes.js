const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  updateProfileValidation,
  changePasswordValidation,
} = require('../validations/userValidation');

const router = express.Router();

router.use(protect);

router.patch('/profile', updateProfileValidation, validate, userController.updateProfile);
router.patch('/password', changePasswordValidation, validate, userController.changePassword);

module.exports = router;

const express = require('express');
const transactionController = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createTransactionValidation,
  updateTransactionValidation,
  idParamValidation,
  listTransactionsValidation,
} = require('../validations/transactionValidation');

const router = express.Router();

router.use(protect);

router.get('/categories', transactionController.getCategories);

router
  .route('/')
  .get(listTransactionsValidation, validate, transactionController.getTransactions)
  .post(createTransactionValidation, validate, transactionController.createTransaction);

router
  .route('/:id')
  .get(idParamValidation, validate, transactionController.getTransaction)
  .patch(updateTransactionValidation, validate, transactionController.updateTransaction)
  .delete(idParamValidation, validate, transactionController.deleteTransaction);

module.exports = router;

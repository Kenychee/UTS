const express = require('express');

const celebrate = require('../../../core/celebrate-wrappers');
const transactionControllers = require('./UTS-controller');
const transactionValidator = require('./UTS-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/UTSDB', route);

  // Get list transaction
  route.get('/', transactionControllers.getTransactions);

  // Get transaction detail
  route.get('/:id', transactionControllers.getTransaction);

  // Create transaction
  route.post(
    '/',
    celebrate(transactionValidator.createTransaction),
    transactionControllers.createTransaction
  );

  // Update transaction
  route.put(
    '/:id',
    celebrate(transactionValidator.updateTransaction),
    transactionControllers.updateTransaction
  );

  // Delete transaction
  route.delete('/:id', transactionControllers.deleteTransaction);
};
const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const transactionControllers = require('./UTS-controller');
const transactionValidator = require('./UTS-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/UTSDB', route);

  // Get list transaction
  route.get('/', authenticationMiddleware, transactionControllers.getTransactions);

  // Get transaction detail
  route.get('/:id', authenticationMiddleware, transactionControllers.getTransaction);

  // Create transaction
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(transactionValidator.createTransaction),
    transactionControllers.createTransaction
  );

  // Update transaction
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(transactionValidator.updateTransaction),
    transactionControllers.updateTransaction
  );

  // Delete transaction
  route.delete('/:id', authenticationMiddleware, transactionControllers.deleteTransaction);
};
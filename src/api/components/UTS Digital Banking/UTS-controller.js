const transactionService = require('./UTS-service');
const transactionRepository = require('./UTS-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get transaction detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getTransactionsKhenichi(request, response, next) {
  try {
    const transactions = await transactionService.getTransactionsKhenichi();

    if (!transactions) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown transaction');
    }

    return response.status(200).json(transactions);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get transaction detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getTransactionKhenichi(request, response, next) {
  try {
    const transaction = await transactionService.getTransactionKhenichi(request.params.id);

    if (!transaction) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown transaction');
    }

    return response.status(200).json(transaction);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create transaction request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createTransactionKhenichi(request, response, next) {
  try {
    const sender = request.body.sender;
    const receipt = request.body.receipt;
    const amount = request.body.amount;
    const description = request.body.description;

    const success = await transactionService.createTransactionKhenichi(sender, receipt, amount, description);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create transaction'
      );
    }

    return response.status(200).json({ sender, receipt });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle transaction user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateTransactionKhenichi(request, response, next) {
  try {
    const id = request.params.id;
    const sender = request.body.sender;
    const receipt = request.body.receipt;
    const amount = request.body.amount;
    const description = request.body.description;

    const success = await transactionService.updateTransactionKhenichi(id, sender, receipt, amount, description);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update transaction'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete transaction request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteTransactionKhenichi(request, response, next) {
  try {
    const id = request.params.id;

    const success = await transactionService.deleteTransactionKhenichi(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete transaction'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTransactionsKhenichi,
  getTransactionKhenichi,
  createTransactionKhenichi,
  updateTransactionKhenichi,
  deleteTransactionKhenichi,
};
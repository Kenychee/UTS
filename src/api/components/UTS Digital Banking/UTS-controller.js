const transactionRepository = require('./UTS-repository');
const transactionService = require('./UTS-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// untuk menyimpan transaksi
let transactions = [];

/**
 * Handle get transaction detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getTransaction(request, response, next) {
  try {
    const transaction = await transactionRepository.getTransaction(request.params.transactionID);

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
async function createTransaction(request, response, next) {
  try {
    const sender = request.body.sender;
    const receipt = request.body.receipt;
    const amount = request.body.amount;
    const description = request.body.description;
    const timestampt = request.body.timestampt;

    const newTransaction = {
      id: transactions.length + 1,
      sender,
      receipt,
      amount,
      description,
      timestampt
    };
    transactions.push(newTransaction);
    return response.status(200).json({ newTransaction });
  } catch (error) {
    return next(error);
  }
}
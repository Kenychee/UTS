const {
  sender,
  receipt,
  amount,
  description,
} = require('../../../models/UTS-schema');
const transactionRepository = require('./UTS-repository');

/**
 * Get list of transactions
 * @returns {Array}
 */
async function getTransactionsKhenichi() {
  const transactions = await transactionRepository.getTransactionsKhenichi();

  const results = [];
  for (let i = 0; i < transactions.length; i += 1) {
    const transaction = transactions[i];
    results.push({
      id: transaction.id,
      sender: transaction.sender,
      receipt: transaction.receipt,
      amount: transaction.amount,
      description: transaction.description,
    });
  }

  return results;
}

/**
 * Get transaction detail
 * @param {string} id - Transaction's ID
 * @returns {Object}
 */
async function getTransactionKhenichi(id) {
  const transaction = await transactionRepository.getTransactionKhenichi(id);

  // id transaction not foung
  if (!transaction) {
    return null;
  }

  return {
    id: transaction.id,
    sender: transaction.sender,
    receipt: transaction.receipt,
    amount: transaction.amount,
    description: transaction.description,
  };
}

/**
 * Create new transaction
 * @param {string} sender - Sender
 * @param {string} receipt - Receipt
 * @param {number} amount - Amount
 * @param {string} description - Sender's description
 * @returns {boolean}
 */
async function createTransactionKhenichi(sender, receipt, amount, description) {
  try {
    await transactionRepository.createTransactionKhenichi(
      sender,
      receipt,
      amount,
      description
    );
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing transaction
 * @param {string} sender - Sender
 * @param {string} receipt - Receipt
 * @param {number} amount - Amount
 * @param {string} description - Sender's description
 * @returns {boolean}
 */
async function updateTransactionKhenichi(id, sender, receipt, amount, description) {
  const transaction = await transactionRepository.getTransactionKhenichi(id);

  // if transaction not found
  if (!transaction) {
    return null;
  }

  try {
    await transactionRepository.updateTransactionKhenichi(
      id,
      sender,
      receipt,
      amount,
      description
    );
    return true;
    
  } catch (err) {
    return null;
  }
}

/**
 * Delete a transaction
 * @param {string} id - Transaction's id
 * @returns {boolean}
 */
async function deleteTransactionKhenichi(id) {
  const transaction = await transactionRepository.getTransactionKhenichi(id);

  // if transaction not found
  if (!transaction) {
    return null;
  }

  try {
    await transactionRepository.deleteTransactionKhenichi(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getTransactionsKhenichi,
  getTransactionKhenichi,
  createTransactionKhenichi,
  updateTransactionKhenichi,
  deleteTransactionKhenichi,
};

const { Uts } = require('../../../models');

/**
 * Get transaction list
 * @returns {promise}
 */
async function getTransactionsKhenichi() {
  return Uts.find({});
}

/**
 * Get transaction detail
 * @param {string} id - transaction ID
 * @returns {Promise}
 */
async function getTransactionKhenichi(id) {
  return Uts.findById(id);
}

/**
 * Create new transaction
 * @param {string} sender - Sender
 * @param {string} receipt - Receipt
 * @param {number} amount - Amount
 * @param {string} description - Sender's description
 * @returns {Promise}
 */
async function createTransactionKhenichi(sender, receipt, amount, description) {
  return Uts.create({
    sender,
    receipt,
    amount,
    description,
  });
}

/**
 * Update existing transaction
 * @param {string} sender - Sender
 * @param {string} receipt - Receipt
 * @param {number} amount - Amount
 * @param {string} description - Sender's description
 * @returns {Promise}
 */
async function updateTransactionKhenichi(id, sender, receipt, amount, description) {
  return Uts.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        sender,
        receipt,
        amount,
        description,
      },
    }
  );
}

/**
 * Delete a transaction
 * @param {string} id - Transaction's id
 * @returns {Promise}
 */
async function deleteTransactionKhenichi(id) {
  return Uts.deleteOne({ _id: id });
}

module.exports = {
  getTransactionsKhenichi,
  getTransactionKhenichi,
  createTransactionKhenichi,
  updateTransactionKhenichi,
  deleteTransactionKhenichi,
};
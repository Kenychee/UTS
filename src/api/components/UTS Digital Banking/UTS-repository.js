const { Uts } = require('../../../models');

/**
 * Get transaction list
 * @returns {promise}
 */
async function getTransactions() {
  return Uts.find({});
}

/**
 * Get transaction detail
 * @param {string} id - transaction ID
 * @returns {Promise}
 */
async function getTransaction(id) {
  return Uts.findById(id);
}

/**
 * Create new transaction
 * @param {string} sender - Sender
 * @param {string} receipt - Receipt
 * @param {string} amount - Amount
 * @param {string} description - Sender's description
 * @returns {Promise}
 */
async function createTransaction(sender, receipt, amount, description) {
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
 * @param {string} amount - Amount
 * @param {string} description - Sender's description
 * @returns {Promise}
 */
async function updateTransaction(sender, receipt, amount, description) {
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
async function deleteTransaction(id) {
  return Uts.deleteOne({ _id: id });
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
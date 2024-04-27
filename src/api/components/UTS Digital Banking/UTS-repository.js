/**
 * Get transaction detail
 * @param {string} transactionID - transaction id
 * @returns {promise}
 */
async function getTransaction(transactionID) {
  return find(transactionID);
}
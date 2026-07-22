/**
 * Transaction Repository
 *
 * Handles all database operations related to transactions.
 *
 * Responsibilities:
 * - Create transaction records
 * - Retrieve transactions by account
 *
 * This layer interacts directly with the Transaction model
 * and contains no business logic.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */


const Transaction = require("../models/transaction.model")

/**
 * Creates a new transaction record.
 *
 * @param {Object} transactionData - Transaction payload
 *
 * @returns {Promise<Object>} Created transaction document
 */
const createTransaction = async (transactionData, session = null ) => {
    return await Transaction.create(
        [transactionData],
        { session }
    ).then (result => result[0])
}

/**
 * Retrieves all transactions associated with an account.
 *
 * Transactions are returned in descending order of creation,
 * showing the most recent transactions first.
 *
 * @param {string} accountId - Account identifier
 *
 * @returns {Promise<Array>} List of transaction documents
 */
const findTransactionByAccountId = async (accountId) => {
    return await Transaction.find({ accountId }).sort({ createdAt: -1 })
}


module.exports = {
    createTransaction,
    findTransactionByAccountId,
}
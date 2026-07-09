/**
 * Account Repository
 *
 * Handles all database operations related to bank accounts.
 *
 * Responsibilities:
 * - Create accounts
 * - Find accounts by account number
 * - Retrieve accounts belonging to a user
 *
 * This layer interacts directly with the Account model
 * and contains no business logic.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const Account = require("../models/account.model");

/**
 * Creates a new account document.
 *
 * @param {Object} accountData - Account payload
 *
 * @returns {Promise<Object>} Created account document
 */
const createAccount = async (accountData) => {
    return await Account.create(accountData)
}

/**
 * Retrieves an account using its account number.
 *
 * @param {string} accountNumber - Unique account number
 *
 * @returns {Promise<Object|null>} Matching account document
 */
const findAccountByNumber = async (accountNumber) => {
    return await Account.findOne({ accountNumber })
}

/**
 * Retrieves all accounts owned by a user.
 *
 * @param {string} userId - User identifier
 *
 * @returns {Promise<Array>} List of account documents
 */
const findAccountsByUserId = async (userId) => {
    return await Account.find({ userId })
}

/**
 * Retrieves an account by its identifier.
 *
 * @param {string} accountId - Account identifier
 *
 * @returns {Promise<Object|null>} Matching account document
 */
const findAccountById = async (accountId) => {
    return Account.findById(accountId)
}

module.exports = {
    createAccount,
    findAccountByNumber,
    findAccountsByUserId,
    findAccountById,
}
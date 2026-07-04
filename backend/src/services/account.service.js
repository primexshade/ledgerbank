/**
 * Account Service
 *
 * Handles all account-related business logic.
 *
 * Responsibilities:
 * - Generate account numbers
 * - Create bank accounts
 * - Retrieve user accounts
 *
 * This layer coordinates account operations
 * and communicates with the repository layer.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const accountRepository = require("../repositories/account.repository");





/**
 * Generates a unique account number.
 *
 * Format:
 * LB + Current Timestamp
 *
 * Example:
 * LB1783167610849
 *
 * @returns {string} Generated account number
 */
const generateAccountNumber = () => {

    // Prefix account numbers with LB to identify
    // LedgerBank accounts across the system.
    return `LB${Date.now()}`;
};

/**
 * Creates a new bank account for a user.
 *
 * Business Rules:
 * - Every account receives a unique account number
 * - Default account type is SAVINGS
 * - New accounts start with a zero balance
 * - New accounts are ACTIVE by default
 *
 * @param {string} userId - Owner of the account
 * @param {string} accountType - SAVINGS or CURRENT
 *
 * @returns {Promise<Object>} Created account
 */
const createBankAccount = async (
    userId,
    accountType = "SAVINGS"
) => {
    // Generate a unique LedgerBank account number
    const accountNumber = generateAccountNumber();

    // Persist the account in the database.
    const account =
        await accountRepository.createAccount({
            accountNumber,
            userId,
            accountType,
        });

    return account;
};

/**
 * Retrieves all accounts owned by a user.
 *
 * @param {string} userId - User identifier
 *
 * @returns {Promise<Array>} List of user accounts
 */
const getMyAccounts = async (userId) => {
    return await accountRepository.findAccountsByUserId(
        userId
    );
};

module.exports = {
    createBankAccount,
    getMyAccounts,
};
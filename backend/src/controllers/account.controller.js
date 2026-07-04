/**
 * Account Controller
 *
 * Handles incoming HTTP requests related to bank accounts.
 *
 * Responsibilities:
 * - Create bank accounts
 * - Retrieve user accounts
 *
 * This layer extracts request data,
 * delegates business logic to services,
 * and returns standardized API responses.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const {
    createBankAccount,
    getMyAccounts,
} = require("../services/account.service");

const {
    successResponse,
    errorResponse,
} = require("../utils/response");


/**
 * Creates a new bank account for the authenticated user.
 *
 * Request Body:
 * {
 *   accountType: "SAVINGS" | "CURRENT"
 * }
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * @returns {Promise<Object>} Standardized API response
 */
const createAccount = async (req, res) => {
    try {
        // Delegate account creation to service layer.
        const account = await createBankAccount(
            req.user.userId,
            req.body.accountType
        );

        return successResponse(
            res,
            "Account created successfully",
            account,
            201
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            null,
            400
        );
    }
};

/**
 * Retrieves all bank accounts belonging
 * to the authenticated user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * @returns {Promise<Object>} Standardized API response
 */

const getAccounts = async (req, res) => {
    try {
        // Fetch all accounts owned by the authenticated user.
        const accounts = await getMyAccounts(
            req.user.userId
        );

        return successResponse(
            res,
            "Accounts fetched successfully",
            accounts
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            null,
            400
        );
    }
};

module.exports = {
    createAccount,
    getAccounts,
};
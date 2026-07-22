/**
 * Transaction Controller
 *
 * Handles incoming HTTP requests related to transactions.
 *
 * Responsibilities:
 * - Process deposit requests
 * - Process withdrawal requests
 * - Process transfer requests
 * - Retrieve transaction history
 *
 * This layer acts as a bridge between routes and services.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const transactionService = require("../services/transaction.service");
const { validateDeposit, validateWithdraw, validateTransfer} = require("../validators/transaction.validator")

/**
 * Handles account deposit requests.
 *
 * Request Body:
 * {
 *   accountNumber: string,
 *   amount: number
 * }
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * @returns {Promise<Object>} JSON response
 */
const deposit = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body

        const validationError = validateDeposit(req.body)

        if(validationError) {
            return res.status(400).json({
                success:false,
                message: validationError,
            })
        }

        // Delegate deposit processing to service layer.
        const result = await transactionService.deposit(accountNumber, amount)

        return res.status(200).json({
            success: true,
            message: "Deposit successful",
            data: result,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

/**
 * Handles account withdrawal requests.
 *
 * Request Body:
 * {
 *   accountNumber: string,
 *   amount: number
 * }
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @returns {Promise<Object>}
 */
const withdraw = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body

        const validationError = validateWithdraw(req.body)

        if(validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            })
        }

        const result = await transactionService.withdraw(
            req.user.userId,
            accountNumber,
            amount
        )

        return res.status(200).json({
            success: true,
            message: "Withdrawal successful",
            data: result,
        })
    }catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

/**
 * Handles fund transfer requests.
 *
 * Request Body:
 * {
 *   fromAccountNumber: string,
 *   toAccountNumber: string,
 *   amount: number
 * }
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @returns {Promise<Object>}
 */
const transfer = async (req, res) => {
    try {
        const { fromAccountNumber, toAccountNumber, amount } = req.body

        const validationError = validateTransfer(req.body)

        if(validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            })
        }
        
        const result = await transactionService.transfer(
            req.user.userId,
            fromAccountNumber,
            toAccountNumber,
            amount
        )
        // Delegate transfer validation and execution to service layer.
        return res.status(200).json({
            success: true,
            message: "Transfer successful",
            data: result,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

/**
 * Retrieves transaction history for an account.
 *
 * Route Parameter:
 * - accountNumber
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @returns {Promise<Object>}
 */
const getTransactionHistory = async (req, res) => {
    try {
        const { accountNumber } = req.params

        const transactions = await transactionService.getTransactionHistory(req.user.userId, accountNumber)
        
        // Fetch transaction history from service layer.
        return res.status(200).json({
            success: true,
            message: "Transaction fetched successfully",
            data: transactions,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    deposit,
    withdraw,
    transfer,
    getTransactionHistory,
}
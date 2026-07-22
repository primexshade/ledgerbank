/**
 * Transaction Service
 *
 * Handles all transaction-related business logic.
 *
 * Responsibilities:
 * - Deposit funds into an account
 * - Withdraw funds from an account
 * - Transfer funds between accounts
 * - Retrieve transaction history
 *
 * This layer coordinates account updates and transaction creation
 * while enforcing business validation rules.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const transactionRepository = require("../repositories/transaction.repository")
const accountRepository = require("../repositories/account.repository")
const mongoose = require("mongoose")

/**
 * Deposits funds into a bank account.
 *
 * Validation Rules:
 * - Account must exist
 * - Amount must be greater than zero
 *
 * @param {string} accountNumber - Target account number
 * @param {number} amount - Amount to deposit
 *
 * @returns {Promise<Object>} Updated account and transaction details
 *
 * @throws {Error} If account is not found
 * @throws {Error} If amount is less than or equal to zero
 */
const deposit = async (accountNumber, amount) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than zero")
    }

    // Update account balance before recording transaction
    account.balance += amount
    await account.save()

    // Record the deposit for audit and transaction history purposes
    const transaction = await transactionRepository.createTransaction({
        accountId: account._id,
        type: "DEPOSIT",
        amount,
        description: "Cash Deposit",
        reference: `TXN${Date.now()}`,
        status: "SUCCESS",
    })

    return {
        account,
        transaction,
    }
}

/**
 * Withdraws funds from a bank account.
 *
 * Validation Rules:
 * - Account must exist
 * - Amount must be greater than zero
 * - Account must have sufficient balance
 *
 * @param {string} accountNumber - Source account number
 * @param {number} amount - Amount to withdraw
 *
 * @returns {Promise<Object>} Updated account and transaction details
 *
 * @throws {Error} If account is not found
 * @throws {Error} If amount is invalid
 * @throws {Error} If balance is insufficient
 */
const withdraw = async (userId, accountNumber, amount) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    if(account.userId.toString() !== userId) {
        throw new Error("Unauthorized access to account")
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than zero")
    }

    if (account.balance < amount) {
        throw new Error("Insufficient balance")
    }

    // Deduct the requested amount from the account balance
    account.balance -= amount
    await account.save()

    // Record the withdrawal transaction
    const transaction = await transactionRepository.createTransaction({
        accountId: account._id,
        type: "WITHDRAWAL",
        amount,
        description: "Cash Withdrawal",
        reference: `TXN${Date.now()}`,
        status: "SUCCESS",
    })

    return {
        account,
        transaction,
    }
}

/**
 * Transfers funds between two bank accounts.
 *
 * Validation Rules:
 * - Sender account must exist
 * - Receiver account must exist
 * - Sender and receiver must be different
 * - Amount must be greater than zero
 * - Sender must have sufficient balance
 *
 * Business Rules:
 * - Sender balance is debited
 * - Receiver balance is credited
 * - Two transaction records are created
 * - Both transaction records share the same reference number
 *
 * @param {string} fromAccountNumber - Sender account number
 * @param {string} toAccountNumber - Receiver account number
 * @param {number} amount - Transfer amount
 *
 * @returns {Promise<Object>} Transfer result containing account and transaction details
 *
 * @throws {Error} If sender account does not exist
 * @throws {Error} If receiver account does not exist
 * @throws {Error} If amount is invalid
 * @throws {Error} If sender balance is insufficient
 */
const transfer = async (
    userId,
    fromAccountNumber,
    toAccountNumber,
    amount
) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const sender =
            await accountRepository.findAccountByNumber(
                fromAccountNumber
            )

        const receiver =
            await accountRepository.findAccountByNumber(
                toAccountNumber
            )

        if (!sender) {
            throw new Error("Sender account not found")
        }

        if (
            sender.userId.toString() !== userId
        ) {
            throw new Error(
                "Unauthorized access to account"
            )
        }

        if (!receiver) {
            throw new Error(
                "Receiver account not found"
            )
        }

        if (
            fromAccountNumber ===
            toAccountNumber
        ) {
            throw new Error(
                "Cannot transfer to the same account"
            )
        }

        if (amount <= 0) {
            throw new Error(
                "Amount must be greater than zero"
            )
        }

        if (sender.balance < amount) {
            throw new Error(
                "Insufficient balance"
            )
        }

        sender.balance -= amount
        receiver.balance += amount

        await sender.save({ session })
        await receiver.save({ session })

        const reference =
            `TXN${Date.now()}`

        const senderTransaction =
            await transactionRepository.createTransaction({
                accountId: sender._id,
                type: "TRANSFER",
                amount,
                description:
                    `Transfer sent to ${toAccountNumber}`,
                reference,
                status: "SUCCESS",
            },
            session
        )

        const receiverTransaction =
            await transactionRepository.createTransaction({
                accountId: receiver._id,
                type: "TRANSFER",
                amount,
                description:
                    `Transfer received from ${fromAccountNumber}`,
                reference,
                status: "SUCCESS",
            },
            session
        )

        await session.commitTransaction()

        return {
            sender,
            receiver,
            senderTransaction,
            receiverTransaction,
        }
    } catch (error) {
        await session.abortTransaction()
        throw error
    } finally {
        session.endSession()
    }
}

/**
 * Retrieves transaction history for an account.
 *
 * @param {string} accountNumber - Account number
 *
 * @returns {Promise<Array>} List of transactions ordered by newest first
 *
 * @throws {Error} If account is not found
 */
const getTransactionHistory = async (userId, accountNumber) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    if(account.userId.toString() !== userId) {
        throw new Error("Unauthorized access to account")
    }

    return await transactionRepository.findTransactionByAccountId(account._id)
}

module.exports = {
    deposit,
    withdraw,
    transfer,
    getTransactionHistory,
}
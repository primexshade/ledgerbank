/**
 * Transaction Model
 *
 * Defines the transaction schema used to record all
 * monetary operations within LedgerBank.
 *
 * Supported Transaction Types:
 * - DEPOSIT
 * - WITHDRAWAL
 * - TRANSFER
 *
 * Supported Statuses:
 * - SUCCESS
 * - FAILED
 * - PENDING
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const mongoose = require("mongoose")

/**
 * Transaction Schema
 *
 * Stores transaction records for:
 * - Deposits
 * - Withdrawals
 * - Transfers
 *
 * Each transaction belongs to a single account.
 */
const transactionSchema = new mongoose.Schema(
    {
        // Account associated with the transaction.
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        // Defines the nature of the transaction.
        type: {
            type: String,
            enum: [
                "DEPOSIT",
                "WITHDRAWAL",
                "TRANSFER",
            ],
            required: true,
        },
        // Monetary value involved in the transaction.
        amount: {
            type: Number,
            required: true,
            min: [1, "Transaction amount must be greater than 0"]
        },
        description: {
            type: String,
            default: "",
        },
        // Shared reference number used for transaction tracking.
        // Transfer operations may generate multiple transaction
        // records using the same reference value.
        reference: {
            type: String,
            required: true,
        },
        // Current processing state of the transaction.
        status: {
            type: String,
            enum: [
                "SUCCESS",
                "FAILED",
                "PENDING",
            ],
            default: "SUCCESS",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Transaction",
    transactionSchema,
);
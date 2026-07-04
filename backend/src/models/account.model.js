/**
 * Account Model
 *
 * Defines the account schema used to represent
 * customer bank accounts within LedgerBank.
 *
 * Supported Account Types:
 * - SAVINGS
 * - CURRENT
 *
 * Supported Account Statuses:
 * - ACTIVE
 * - BLOCKED
 * - CLOSED
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const mongoose = require("mongoose")

/**
 * Account Schema
 *
 * Stores account information including:
 * - Account ownership
 * - Account type
 * - Account balance
 * - Account status
 *
 * Each account belongs to a single user.
 */
const accountSchema = new mongoose.Schema(
    {
        // Unique LedgerBank account number.
        accountNumber: {
            type: String,
            required: true,
            unique: true,
        },
        // User who owns this account.
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Defines the category of the account.
        accountType: {
            type: String,
            enum: ['SAVINGS', 'CURRENT'],
            default: "SAVINGS",
        },
        // Current available balance in the account.
        balance: {
            type: Number,
            default: 0,
            min: 0,
        },
        // Operational status of the account.
        status: {
            type: String,
            enum: ['ACTIVE', 'BLOCKED', 'CLOSED'],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Account", accountSchema)
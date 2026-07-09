/**
 * Benficiary Model
 * 
 * Reperesents a saved transfer recipient for a user 
 * 
 * Business Rules:
 * - A beneficiary belongs to a single user.
 * - A beneficiary references an existing account.
 * - Duplicate beneficiaries are not allowed.
 * 
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const mongoose = require("mongoose")

const beneficiarySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        beneficiaryAccountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },

        nickname: {
            type: String,
            required: [true, "Nickname is required"],
            trim: true,
            minlength: [2, "Nickname must contain at least 2 characters"],
            maxlength: [50, "Nickname cannot exceed 50 characters"],
        },
    },
    {
        timestamps: true,
    }
)

/**
 * Prevent duplicate beneficiaries for the same user.
 */
beneficiarySchema.index(
    {
        userId:1,
        beneficiaryAccountId:1,
    },
    {
        unique: true,
    }
)

module.exports = mongoose.model(
    "Beneficiary",
    beneficiarySchema
)
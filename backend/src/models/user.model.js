/**
 * User Model
 *
 * Represents application users within LedgerBank.
 *
 * Responsibilities:
 * - Store customer/admin profile information
 * - Store authentication credentials
 * - Track verification status
 * - Support role-based authorization
 *
 * Security Notes:
 * - Passwords are stored as hashes only
 * - Emails must be unique
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["CUSTOMER", "ADMIN"],
            default: "CUSTOMER",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema)
const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema(
    {
        accountNumber: {
            type: String,
            required: true,
            unique: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        accountType: {
            type: String,
            enum: ['SAVINGS', 'CURRENT'],
            default: "SAVINGS",
        },

        balance: {
            type: Number,
            default: 0,
            min: 0,
        },

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
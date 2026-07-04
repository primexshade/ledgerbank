const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
    {
        accountId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        type: {
            type: String,
            enum: [
                "DEPOSIT",
                "WITHDRAWAL",
                "TRANSFER",
            ],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
            default: "",
        },
        reference: {
            type: String,
            required: true,
        },
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
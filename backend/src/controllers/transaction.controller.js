const transactionService = require("../services/transaction.service");

const deposit = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body

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

const getTransactionHistory = async (req, res) => {
    try {
        const { accountNumber } = req.params

        const transactions = await transactionService.getTransactionHistory(accountNumber)

        return res.status(200).json({
            success: true,
            message: "Transaction feched successfully",
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
    getTransactionHistory,
}
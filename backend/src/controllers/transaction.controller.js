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

const withdraw = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body

        const result = await transactionService.withdraw(
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

const transfer = async (req, res) => {
    try {
        const { fromAccountNumber, toAccountNumber, amount } = req.body
        
        const result = await transactionService.transfer(
            fromAccountNumber,
            toAccountNumber,
            amount
        )
        
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

const getTransactionHistory = async (req, res) => {
    try {
        const { accountNumber } = req.params

        const transactions = await transactionService.getTransactionHistory(accountNumber)

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
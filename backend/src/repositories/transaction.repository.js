const Transaction = require("../models/transaction.model")

const createTransaction = async (transactionData) => {
    return await Transaction.create(transactionData)
}

const findTransactionByAccountId = async (accountId) => {
    return await Transaction.find({ accountId }).sort({ createdAt: -1 })
}


module.exports = {
    createTransaction,
    findTransactionByAccountId,
}
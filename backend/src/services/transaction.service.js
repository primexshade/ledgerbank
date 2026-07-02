const transactionRepository = require("../repositories/transaction.repository")
const accountRepository = require("../repositories/account.repository")

const deposit = async (accountNumber, amount) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than zero")
    }

    account.balance += amount
    await account.save()

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

const getTransactionHistory = async (accountNumber) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    return await transactionRepository.findTransactionByAccountId(account._id)
}

module.exports = {
    deposit,
    getTransactionHistory,
}
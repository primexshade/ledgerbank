const Account = require("../models/account.model");

const createAccount = async (accountData) => {
    return await Account.create(accountData)
}

const findAccountByNumber = async (accountNumber) => {
    return await Account.findOne({ accountNumber })
}

const findAccountsByUserId = async (userId) => {
    return await Account.find({ userId })
}

module.exports = {
    createAccount,
    findAccountByNumber,
    findAccountsByUserId,
}
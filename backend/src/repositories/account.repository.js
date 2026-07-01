const Account = require("../models/account.model");

const createAccount = async (accountData) => {
    return await Account.create(accountData)
}

const findAccountByNumber = async (accountNumber) => {
    return await Account.findOne({ accountNumber })
}

const findAccountByUserId = async (userId) => {
    return await Account.findOne({ userId })
}

module.exports = {
    createAccount,
    findAccountByNumber,
    findAccountByUserId,
}
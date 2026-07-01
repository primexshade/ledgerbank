const accountRepository = require("../repositories/account.repository");

const generateAccountNumber = () => {
    return `LB${Date.now()}`;
};

const createBankAccount = async (
    userId,
    accountType = "SAVINGS"
) => {
    const accountNumber = generateAccountNumber();

    const account =
        await accountRepository.createAccount({
            accountNumber,
            userId,
            accountType,
        });

    return account;
};

const getMyAccounts = async (userId) => {
    return await accountRepository.findAccountsByUserId(
        userId
    );
};

module.exports = {
    createBankAccount,
    getMyAccounts,
};
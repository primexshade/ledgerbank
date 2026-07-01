const {
    createBankAccount,
    getMyAccounts,
} = require("../services/account.service");

const {
    successResponse,
    errorResponse,
} = require("../utils/response");

const createAccount = async (req, res) => {
    try {
        const account = await createBankAccount(
            req.user.userId,
            req.body.accountType
        );

        return successResponse(
            res,
            "Account created successfully",
            account,
            201
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            null,
            400
        );
    }
};

const getAccounts = async (req, res) => {
    try {
        const accounts = await getMyAccounts(
            req.user.userId
        );

        return successResponse(
            res,
            "Accounts fetched successfully",
            accounts
        );
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            null,
            400
        );
    }
};

module.exports = {
    createAccount,
    getAccounts,
};
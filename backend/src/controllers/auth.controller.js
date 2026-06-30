const {
    successResponse,
    errorResponse,
} = require("../utils/response");

const {
    validateRegistration,
    validateLogin,
} = require("../validators/auth.validator");

const {
    registerUser,
    loginUser,
} = require("../services/auth.service");

const register = async (req, res) => {
    const validationError = validateRegistration(req.body);

    if (validationError) {
        return errorResponse(
            res,
            validationError,
            null,
            400
        );
    }

    try {
        const user = await registerUser(req.body);

        return successResponse(
            res,
            "User registered successfully",
            user,
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

const login = async (req, res) => {
    const validateError = validateLogin(req.body)

    if (validateError) {
        return errorResponse(
            res,
            validateError,
            null,
            400
        )
    }

    try {
        const result = await loginUser(req.body)

        return successResponse(
            res,
            "Login Successful",
            result
        )
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            null,
            401
        )
    }
}

module.exports = {
    register,
    login,
};
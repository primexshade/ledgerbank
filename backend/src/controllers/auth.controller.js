const {
    successResponse,
    errorResponse,
} = require("../utils/response");

const {
    validateRegistration,
} = require("../validators/auth.validator");

const {
    registerUser,
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

module.exports = {
    register,
};
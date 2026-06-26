const {
    successResponse,
    errorResponse,
} = require("../utils/response")

const {
    validateRegistration,
} = require("../validators/auth.validator")

const {
    registerUser,
} = require("../services/auth.service")

const register = async (req, res) => {
    const validationError = validateRegistration(req.body)

    if (validationError) {
        return errorResponse(
            res,
            validationError,
            null,
            400
        )
    }

    const user = await registerUser(req.body)

    return successResponse(
        res,
        "User registration request recieved",
        user,
        201
    )
}

module.exports = {
    register,
}
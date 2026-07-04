/**
 * Authentication Controller
 *
 * Handles authentication-related HTTP requests.
 *
 * Responsibilities:
 * - Register new users
 * - Authenticate existing users
 * - Validate incoming request payloads
 * - Return standardized API responses
 *
 * Business logic is delegated to the service layer.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
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

/**
 * Registers a new user.
 *
 * Validation Flow:
 * - Validate request payload
 * - Delegate registration to service layer
 * - Return standardized response
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * @returns {Promise<Object>} Standardized API response
 */
const register = async (req, res) => {
    // Validate registration payload before processing.
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
        // Delegate user registration to service layer.
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

/**
 * Authenticates a user and returns an access token.
 *
 * Validation Flow:
 * - Validate request payload
 * - Verify user credentials
 * - Return authentication token
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * @returns {Promise<Object>} Standardized API response
 */
const login = async (req, res) => {
    // Validate login payload before processing.
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
        // Delegate authentication logic to service layer.
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
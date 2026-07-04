/**
 * Authentication Middleware
 *
 * Protects secured routes by validating JWT access tokens.
 *
 * Responsibilities:
 * - Extract JWT from Authorization header
 * - Validate token signature and expiration
 * - Populate req.user with token payload
 * - Reject unauthorized requests
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

/**
 * Authenticates incoming requests using JWT.
 *
 * Expected Header:
 *
 * Authorization: Bearer <token>
 *
 * On success:
 * - req.user is populated
 * - Request proceeds to next middleware
 *
 * On failure:
 * - Returns HTTP 401 Unauthorized
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header missing",
        })
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization format",
        })
    }
    try {
        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        })
    }
}

module.exports = {
    authenticate,
}
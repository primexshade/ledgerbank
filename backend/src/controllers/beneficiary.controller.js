/**
 * Beneficiary Controller
 *
 * Handles beneficiary-related HTTP requests.
 *
 * Responsibilities:
 * - Add beneficiaries
 * - Retrieve beneficiaries
 * - Remove beneficiaries
 *
 * Business logic is delegated to the service layer.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const {
    successResponse,
    errorResponse,
} = require("../utils/response")

const {
    addBeneficiary,
    getBeneficiaries,
    removeBeneficiary,
} = require("../services/beneficiary.service")

const {
    validateBeneficiary,
} = require("../validators/beneficiary.validator")

/**
 * Adds a new beneficiary for the authenticated user.
 *
 * @param {Object} req
 * @param {Object} res
 */
const createBeneficiary = async (req, res) => {
    const validationError = validateBeneficiary(req.body)

    if (validationError) {
        return errorResponse(
            res,
            validationError,
            400
        )
    }

    try {
        const beneficiary = await addBeneficiary(
            req.user.userId,
            req.body
        )

        return successResponse(
            res,
            beneficiary,
            "Beneficiary added successfully",
            201
        )
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            400
        )
    }
}

/**
 * Retrieves all beneficiaries belonging to the authenticated user.
 *
 * @param {Object} req
 * @param {Object} res
 */
const getUserBeneficiaries = async (req, res) => {
    try {
        const beneficiaries = await getBeneficiaries(
            req.user.userId
        )

        return successResponse(
            res,
            beneficiaries,
            "Beneficiaries retrieved successfully"
        )
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            400
        )
    }
}

/**
 * Removes a beneficiary owned by the authenticated user.
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteBeneficiary = async (req, res) => {
    try {
        await removeBeneficiary(
            req.user.userId,
            req.params.id
        )

        return successResponse(
            res,
            null,
            "Beneficiary removed successfully"
        )
    } catch (error) {
        return errorResponse(
            res,
            error.message,
            400
        )
    }
}

module.exports = {
    createBeneficiary,
    getUserBeneficiaries,
    deleteBeneficiary,
}
/**
 * Beneficiary Repository
 *
 * Handles all database operations related to beneficiaries.
 *
 * Responsibilities:
 * - Create beneficiaries
 * - Retrieve beneficiaries
 * - Find beneficiaries
 * - Delete beneficiaries
 *
 * This layer should contain only data-access logic
 * and should not implement business rules.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const Beneficiary = require("../models/beneficiary.model")

/**
 * Creates a new beneficiary.
 *
 * @param {Object} beneficiaryData
 * @returns {Promise<Object>}
 */
const createBeneficiary = async (beneficiaryData) => {
    return Beneficiary.create(beneficiaryData)
}

/**
 * Finds a beneficiary by user and beneficiary account.
 *
 * Used to prevent duplicate beneficiaries.
 *
 * @param {string} userId
 * @param {string} beneficiaryAccountId
 * @returns {Promise<Object|null>}
 */
const findBeneficiary = async (
    userId,
    beneficiaryAccountId
) => {
    return Beneficiary.findOne({
        userId,
        beneficiaryAccountId,
    })
}

/**
 * Retrieves all beneficiaries belonging to a user.
 *
 * @param {string} userId
 * @returns {Promise<Array>}
 */
const findBeneficiariesByUserId = async (userId) => {
    return Beneficiary.find({ userId })
        .populate("beneficiaryAccountId")
}

/**
 * Finds a beneficiary by id.
 *
 * @param {string} beneficiaryId
 * @returns {Promise<Object|null>}
 */
const findBeneficiaryById = async (beneficiaryId) => {
    return Beneficiary.findById(beneficiaryId)
}

/**
 * Deletes a beneficiary.
 *
 * @param {string} beneficiaryId
 * @returns {Promise<Object|null>}
 */
const deleteBeneficiary = async (beneficiaryId) => {
    return Beneficiary.findByIdAndDelete(
        beneficiaryId
    )
}

module.exports = {
    createBeneficiary,
    findBeneficiary,
    findBeneficiariesByUserId,
    findBeneficiaryById,
    deleteBeneficiary,
}
/**
 * Beneficiary Service
 *
 * Handles business logic related to beneficiaries.
 *
 * Responsibilities:
 * - Add beneficiaries
 * - Retrieve beneficiaries
 * - Delete beneficiaries
 *
 * Business Rules:
 * - Beneficiary account must exist
 * - Users cannot add their own accounts
 * - Duplicate beneficiaries are not allowed
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const beneficiaryRepository = require("../repositories/beneficiary.repository");
const accountRepository = require("../repositories/account.repository");

/**
 * Adds a beneficiary for a user.
 *
 * @param {string} userId
 * @param {Object} beneficiaryData
 *
 * @returns {Promise<Object>}
 */
const addBeneficiary = async (userId, beneficiaryData) => {
    const { accountNumber, nickname } = beneficiaryData

    // Verify beneficiary account exists
    const beneficiaryAccount = await accountRepository.findAccountByNumber(accountNumber)

    if (!beneficiaryAccount) {
        throw new Error("Beneficiary account not found")
    }

    // Prevent user from adding their own account

    if (beneficiaryAccount.userId.toString() === userId) {
        throw new Error("You cannot add your own account as a beneficiary")
    }

    // Prevent duplicate beneficairies
    const existingBeneficiary = await beneficiaryRepository.findBeneficiary(userId, beneficiaryAccount._id)

    if (existingBeneficiary) {
        throw new Error("Beneficiary already exists")
    }

    return beneficiaryRepository.createBeneficiary({
        userId,
        beneficiaryAccountId: beneficiaryAccount._id,
        nickname
    })
}

/**
 * Retrieves all beneficiaries belonging to a user.
 *
 * @param {string} userId
 *
 * @returns {Promise<Array>}
 */
const getBeneficiaries = async (userId) => {
    return beneficiaryRepository.findBeneficiariesByUserId(userId)
}

/**
 * Deletes a beneficiary.
 *
 * @param {string} userId
 * @param {string} beneficiaryId
 *
 * @returns {Promise<void>}
 */
const removeBeneficiary = async (userId, beneficiaryId) => {
    const beneficiary = await beneficiaryRepository.findBeneficiaryById(beneficiaryId)

    if (!beneficiary) {
        throw new Error("Beneficiary not found")
    }

    //Ensure ownership
    if (beneficiary.userId.toString() !== userId) {
        throw new Error("Unauthorised beneficiary access")
    }

    await beneficiaryRepository.deleteBeneficiary(beneficiaryId)
}

module.exports = {
    addBeneficiary,
    getBeneficiaries,
    removeBeneficiary,
}
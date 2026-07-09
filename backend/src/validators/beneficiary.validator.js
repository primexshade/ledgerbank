/**
 * Beneficiary Validator
 *
 * Validates beneficiary-related request payloads.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const validateBeneficiary = (data) => {
    const {
        accountNumber,
        nickname,
    } = data

    if (!accountNumber) {
        return "Account number is required"
    }

    if (!nickname) {
        return "Nickname is required"
    }

    if (
        nickname.length < 2 ||
        nickname.length > 50
    ) {
        return (
            "Nickname must be between 2 and 50 characters"
        )
    }

    return null
}

module.exports = {
    validateBeneficiary,
}
/**
 * Beneficiary Routes
 *
 * Defines beneficiary-related API endpoints.
 *
 * Routes:
 * - POST   /api/v1/beneficiaries
 * - GET    /api/v1/beneficiaries
 * - DELETE /api/v1/beneficiaries/:id
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */

const express = require("express")

const {
    createBeneficiary,
    getUserBeneficiaries,
    deleteBeneficiary,
} = require("../controllers/beneficiary.controller")

const {
    authenticate,
} = require("../middlewares/auth.middleware")

const router = express.Router()

/**
 * Add beneficiary
 */
router.post(
    "/",
    authenticate,
    createBeneficiary
)

/**
 * Get all beneficiaries of authenticated user
 */
router.get(
    "/",
    authenticate,
    getUserBeneficiaries
)

/**
 * Delete beneficiary
 */
router.delete(
    "/:id",
    authenticate,
    deleteBeneficiary
)

module.exports = router
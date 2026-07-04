/**
 * Account Routes
 *
 * Defines all account-related API endpoints.
 *
 * Protected Routes:
 * - Create bank account
 * - Retrieve user accounts
 *
 * All routes require authentication.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const express = require("express");

const {
    createAccount,
    getAccounts,
} = require("../controllers/account.controller");

const {
    authenticate,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// Create a new bank account for the authenticated user.
router.post(
    "/",
    authenticate,
    createAccount
);

// Retrieve all accounts owned by the authenticated user.
router.get(
    "/me",
    authenticate,
    getAccounts
);

module.exports = router;
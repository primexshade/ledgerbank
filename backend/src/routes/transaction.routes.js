/**
 * Transaction Routes
 *
 * Defines all transaction-related API endpoints.
 *
 * Protected Routes:
 * - Deposit funds
 * - Withdraw funds
 * - Transfer funds
 * - View transaction history
 *
 * All routes require authentication.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const express = require("express");

const {
    deposit,
    withdraw,
    transfer,
    getTransactionHistory,
} = require("../controllers/transaction.controller");

const { authenticate } =
    require("../middlewares/auth.middleware");

const router = express.Router();

// Deposit funds into an account.
router.post(
    "/deposit",
    authenticate,
    deposit
);

// Withdraw funds from an account.
router.post("/withdraw",
    authenticate,
    withdraw
);

// Transfer funds between accounts.
router.post("/transfer",
    authenticate,
    transfer
)

// Retrieve transaction history for an account.
router.get(
    "/history/:accountNumber",
    authenticate,
    getTransactionHistory
);

module.exports = router;
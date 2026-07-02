const express = require("express");

const {
    deposit,
    getTransactionHistory,
} = require("../controllers/transaction.controller");

const { authenticate } =
    require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
    "/deposit",
    authenticate,
    deposit
);

router.get(
    "/history/:accountNumber",
    authenticate,
    getTransactionHistory
);

module.exports = router;
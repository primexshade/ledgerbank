const express = require("express");

const {
    deposit, 
    withdraw,
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

router.post("/withdraw",
    authenticate,
    withdraw
);

router.get(
    "/history/:accountNumber",
    authenticate,
    getTransactionHistory
);

module.exports = router;
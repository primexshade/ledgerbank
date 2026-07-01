const express = require("express");

const {
    createAccount,
    getAccounts,
} = require("../controllers/account.controller");

const {
    authenticate,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    createAccount
);

router.get(
    "/me",
    authenticate,
    getAccounts
);

module.exports = router;
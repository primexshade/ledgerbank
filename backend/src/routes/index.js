const express = require("express")

const authRoutes = require("./auth.routes")
const accountRoutes = require("./account.routes")
const transactionRoutes = require("./transaction.routes")
const beneficiaryRoutes = require("./beneficiary.routes")

const router = express.Router()

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "LedgerBank API is healthy",
        timestamp: new Date().toISOString(),
    })
})

router.use("/auth", authRoutes)
router.use("/accounts", accountRoutes)
router.use("/transactions", transactionRoutes)
router.use("/beneficiaries", beneficiaryRoutes)

module.exports = router
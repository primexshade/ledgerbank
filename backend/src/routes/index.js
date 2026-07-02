const express = require("express")

const authRoutes = require("./auth.routes")
const accountRoutes = require("./account.routes")

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

module.exports = router
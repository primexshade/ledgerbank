const express = require("express")

const {
    register,
    login,
} = require("../controllers/auth.controller")

const { authenticate } = require("../middlewares/auth.middleware")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

router.get("/test", (req, res) => {
    res.json({
        message: "Auth route working",
    });
});

router.get("/profile", authenticate, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected route accessed successfully",
        data: req.user,
    })
})

module.exports = router
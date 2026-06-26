const validator = require("validator")

const validateRegistration = (userData) => {
    const { firstName, lastName, email, password } = userData

    if (!firstName || !lastName || !email || !password) {
        return "All fields are required"
    }

    if (!validator.isEmail(email)) {
        return "Invalid email address"
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters long."
    }

    return null;
}

module.exports = {
    validateRegistration,
}
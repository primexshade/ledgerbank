const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const registerUser = async (userData) => {
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);

    const user = await userRepository.createUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        passwordHash,
    });

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
    };
};

const loginUser = async (userData) => {
    const { email, password } = userData

    const user = await userRepository.findByEmail(email)

    if (!user) {
        throw new Error("Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    )

    if (!isPasswordValid) {
        throw new Error("Invalid email or password")
    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    )

    return {
        accessToken: token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
        },
    }

}

module.exports = {
    registerUser,
    loginUser,
};
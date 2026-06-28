const bcrypt = require("bcrypt");
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

module.exports = {
    registerUser,
};
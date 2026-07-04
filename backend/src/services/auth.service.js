/**
 * Authentication Service
 *
 * Handles all authentication-related business logic.
 *
 * Responsibilities:
 * - Register new users
 * - Hash passwords
 * - Authenticate users
 * - Generate JWT access tokens
 *
 * This layer coordinates validation,
 * authentication, and user management workflows.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userRepository = require("../repositories/user.repository");

/**
 * Registers a new user.
 *
 * Business Rules:
 * - Email must be unique
 * - Passwords are stored as hashes
 * - New users receive default system values
 *
 * @param {Object} userData - Registration payload
 *
 * @returns {Promise<Object>} Public user information
 *
 * @throws {Error} If email already exists
 */
const registerUser = async (userData) => {
    // Prevent duplicate registrations using the same email.
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash the password before persisting the user.
    const passwordHash = await bcrypt.hash(userData.password, 10);

    // Persist the user with the hashed password.
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

/**
 * Authenticates a user and generates an access token.
 *
 * Authentication Flow:
 * - Verify user exists
 * - Verify password
 * - Generate JWT token
 *
 * @param {Object} userData - Login payload
 *
 * @returns {Promise<Object>} Access token and user information
 *
 * @throws {Error} If credentials are invalid
 */
const loginUser = async (userData) => {
    const { email, password } = userData;

    // Retrieve user using the supplied email address.
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare supplied password with stored hash.
    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    // Generate an access token for authenticated requests.
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
    );

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
    };
};

module.exports = {
    registerUser,
    loginUser,
};
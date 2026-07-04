/**
 * User Repository
 *
 * Handles all database operations related to users.
 *
 * Responsibilities:
 * - Create users
 * - Retrieve users by email
 *
 * This layer should contain only data-access logic
 * and should not implement business rules.
 *
 * Project: LedgerBank
 * Author: Aryan Tiwari
 */
const User = require("../models/user.model");

/**
 * Creates a new user record.
 *
 * @param {Object} userData - User information to persist
 *
 * @returns {Promise<Object>} Created user document
 */
const createUser = async (userData) => {
    return await User.create(userData);
};

/**
 * Finds a user by email address.
 *
 * @param {string} email - User email
 *
 * @returns {Promise<Object|null>} User document or null
 */
const findByEmail = async (email) => {
    return await User.findOne({ email });
};

module.exports = {
    createUser,
    findByEmail,
};
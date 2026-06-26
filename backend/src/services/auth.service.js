const registerUser = async (userData) => {
    return {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
    }
}

module.exports = {
    registerUser,
}
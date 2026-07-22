/**
 * Transaction Validator
 * 
 * Validates transaction-related requests.
 */

const validateDeposit = (data) => {
    const { accountNumber, amount } = data 

    if(!accountNumber) {
        return "Account number is required"
    }

    if(amount === undefined || amount === null) {
        return "Amount is required"
    }

    if(amount <= 0) {
        return "Amount must be greater than zero"
    }

    return null
}

const validateWithdraw = (data) => {
    const { accountNumber, amount } = data

    if(!accountNumber) {
        return "Account number is required"
    }

    if(amount === undefined || amount === null) {
        return "Amount is required"
    }  

    if(amount <=0) {
        return "Amount must be greater than zero"
    }

    return null 
}

const validateTransfer = (data) => {
    const {
        fromAccountNumber,
        toAccountNumber,
        amount
    } = data 

    if(!fromAccountNumber) {
        return "Sender account number is required"
    }

    if(!toAccountNumber) {
        return "Receiver account number is required"
    }

    if(fromAccountNumber === toAccountNumber){
        return "Cannot transfer to the same account"
    }

    if(amount === undefined || amount === null){
        return "Amount is required"
    }

    if(amount <= 0) {
        return "Amount must be greater than zero"
    }

    return null
}

module.exports = {
    validateDeposit,
    validateWithdraw,
    validateTransfer,
}
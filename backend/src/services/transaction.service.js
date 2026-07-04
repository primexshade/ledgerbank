const transactionRepository = require("../repositories/transaction.repository")
const accountRepository = require("../repositories/account.repository")

const deposit = async (accountNumber, amount) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than zero")
    }

    account.balance += amount
    await account.save()

    const transaction = await transactionRepository.createTransaction({
        accountId: account._id,
        type: "DEPOSIT",
        amount,
        description: "Cash Deposit",
        reference: `TXN${Date.now()}`,
        status: "SUCCESS",
    })

    return {
        account,
        transaction,
    }
}

const withdraw = async (accountNumber, amount) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if(!account){
        throw new Error("Account not found")
    }

    if(amount <= 0){
        throw new Error ("Amount must be greater than zero")
    }

    if(account.balance < amount){
        throw new Error("Insufficient balance")
    }
    
    account.balance -= amount
    await account.save()
    
    const transaction = await transactionRepository.createTransaction({
        accountId: account._id,
        type: "WITHDRAWAL",
        amount,
        description: "Cash Withdrawal",
        reference: `TXN${Date.now()}`,
        status: "SUCCESS",
    })

    return {
        account,
        transaction,
    }
}

const transfer = async (fromAccountNumber, toAccountNumber,amount) => {
    const sender = await accountRepository.findAccountByNumber(fromAccountNumber)

    const receiver = await accountRepository.findAccountByNumber(toAccountNumber)

    if(!sender) {
        throw new Error("Sender account not found")
    }

    if(!receiver){
        throw new Error("Receiver account not found")
    }

    if(fromAccountNumber === toAccountNumber){
        throw new Error("Cannot transfer to the same account")
    }

    if(amount <= 0){
        throw new Error("Amount must be greater than zero")
    }

    if(sender.balance < amount){
        throw new Error("Insufficient balance") 
    }

    sender.balance -= amount
    receiver.balance += amount
    
    await sender.save()
    await receiver.save()

    const reference = `TXN${Date.now()}`

    const senderTransaction = await transactionRepository.createTransaction({
        accountId: sender._id,
        type: "TRANSFER",
        amount,
        description: `Transfer sent to ${toAccountNumber}`,
        reference,
        status: "SUCCESS"
    })
    
    const receiverTransaction = await transactionRepository.createTransaction({
        accountId:receiver._id,
        type: "TRANSFER",
        amount,
        description: `Transfer received from ${fromAccountNumber}`,
        reference,
        status: "SUCCESS"
    })

    return {
        sender,
        receiver,
        senderTransaction,
        receiverTransaction,
    }
}

const getTransactionHistory = async (accountNumber) => {
    const account = await accountRepository.findAccountByNumber(accountNumber)

    if (!account) {
        throw new Error("Account not found")
    }

    return await transactionRepository.findTransactionByAccountId(account._id)
}

module.exports = {
    deposit,
    withdraw,
    transfer,
    getTransactionHistory,
}
# LedgerBank Transaction Model

## Purpose

The Transaction entity records all monetary operations performed within LedgerBank.

Every deposit, withdrawal, and transfer creates one or more transaction records.

---

## Transaction Entity

| Field | Type | Description |
|---------|---------|---------|
| id | ObjectId | Unique transaction identifier |
| accountId | ObjectId | Related account |
| type | Enum | DEPOSIT, WITHDRAWAL, TRANSFER |
| amount | Number | Transaction amount |
| description | String | Human-readable transaction description |
| reference | String | Transaction reference number |
| status | Enum | SUCCESS, FAILED, PENDING |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

---

## Transaction Types

### DEPOSIT

Funds added to an account.

### WITHDRAWAL

Funds removed from an account.

### TRANSFER

Funds moved between accounts.

---

## Transaction Status

### SUCCESS

Transaction completed successfully.

### FAILED

Transaction could not be completed.

### PENDING

Transaction is awaiting processing.

---

## Business Rules

- Every transaction belongs to an account.
- Transaction amount must be greater than zero.
- Transaction type must be valid.
- Transaction status must be valid.
- Transactions are immutable records.

---

## Transfer Design

A transfer creates two transaction records.

### Sender Transaction

```json
{
  "type": "TRANSFER",
  "description": "Transfer sent to ACCOUNT_NUMBER"
}
```

### Receiver Transaction

```json
{
  "type": "TRANSFER",
  "description": "Transfer received from ACCOUNT_NUMBER"
}
```

Both records share the same reference number.

---

## Important Note

Reference numbers are NOT unique.

A transfer operation intentionally creates two transaction records with the same reference value to maintain traceability between sender and receiver transactions.
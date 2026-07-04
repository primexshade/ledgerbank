# LedgerBank Account Model

## Purpose

The Account entity represents a customer's bank account within LedgerBank.

Each account belongs to a registered user and stores balance information,
account status, and account type.

---

## Account Entity

| Field | Type | Description |
|---------|---------|---------|
| id | ObjectId | Unique account identifier |
| accountNumber | String | Unique bank account number |
| userId | ObjectId | Owner of the account |
| accountType | Enum | SAVINGS or CURRENT |
| balance | Number | Current account balance |
| status | Enum | ACTIVE, BLOCKED, CLOSED |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

---

## Account Types

### SAVINGS

Standard personal banking account.

### CURRENT

Business or high-volume transaction account.

---

## Account Status

### ACTIVE

Account is operational and can perform transactions.

### BLOCKED

Account access is temporarily restricted.

### CLOSED

Account has been permanently closed.

---

## Business Rules

- Account number must be unique.
- Every account belongs to a valid user.
- Default account type is SAVINGS.
- Default balance is 0.
- Default status is ACTIVE.
- Balance cannot be negative.
- A user may own multiple accounts.

---

## Relationships

User (1) --------> (N) Accounts

A single user can own multiple bank accounts.

---

## Account Endpoints

### Create Account

```http
POST /api/v1/accounts
```

Creates a new account for the authenticated user.

### Get My Accounts

```http
GET /api/v1/accounts/me
```

Returns all accounts associated with the authenticated user.
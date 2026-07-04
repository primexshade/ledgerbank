# LedgerBank Account Model

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

## Rules

- Account number must be unique.
- Every account belongs to a user.
- Default account type is SAVINGS.
- Default balance is 0.
- Default status is ACTIVE.
- Balance cannot be negative.

## Account Endpoints

### Create Account

POST /api/v1/accounts

### Get My Accounts

GET /api/v1/accounts/me
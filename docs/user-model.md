# LedgerBank User Model

## User Entity

| Field | Type | Description |
|---------|---------|---------|
| id | UUID | Unique internal identifier |
| firstName | String | User first name |
| lastName | String | User last name |
| email | String | Unique login email |
| passwordHash | String | Hashed password |
| role | Enum | CUSTOMER or ADMIN |
| isVerified | Boolean | Email verification status |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

## Rules

- Email must be unique.
- Passwords are never stored in plain text.
- Users login using email and password.
- JWT will be used for authentication.
- Roles support future admin functionality.

## Authentication Endpoints

### Register

POST /api/v1/auth/register

### Login

POST /api/v1/auth/login

### Current User

GET /api/v1/auth/me
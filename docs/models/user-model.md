# User Model

## Overview

The User model represents all authenticated users within LedgerBank.

It stores:

- Personal information
- Authentication credentials
- Authorization roles
- Verification status

Passwords are never stored in plain text and are always persisted as secure hashes.

---

## Schema

| Field | Type | Description |
|---------|---------|---------|
| _id | ObjectId | Unique MongoDB identifier |
| firstName | String | User first name |
| lastName | String | User last name |
| email | String | Unique login email |
| passwordHash | String | BCrypt hashed password |
| role | Enum | CUSTOMER or ADMIN |
| isVerified | Boolean | Email verification status |
| createdAt | Date | Record creation timestamp |
| updatedAt | Date | Last modification timestamp |

---

## Business Rules

- Email addresses must be unique.
- Users authenticate using email and password.
- Passwords are stored only as hashes.
- Every user is assigned a role.
- New users default to the CUSTOMER role.
- New users default to an unverified state.
- JWT authentication is used for protected routes.

---

## Role Definitions

### CUSTOMER

Standard banking customer.

Permissions include:

- View own account information
- Create transactions
- Transfer funds
- Access personal banking features

### ADMIN

Administrative user.

Reserved for future functionality such as:

- User management
- Account oversight
- Operational controls
- Audit workflows

---

## Verification Status

### isVerified = false

User has not completed the verification process.

### isVerified = true

User has successfully completed verification requirements.

---

## Database Indexes

### Unique Email Index

```js
email: {
    unique: true
}
```

Purpose:

- Prevent duplicate registrations
- Ensure one account per email address
- Support efficient authentication lookups

---

## Authentication Endpoints

### Register

```http
POST /api/v1/auth/register
```

Creates a new user account.

---

### Login

```http
POST /api/v1/auth/login
```

Authenticates a user and returns a JWT access token.

---

### Current User

```http
GET /api/v1/auth/me
```

Returns information about the authenticated user.

Requires:

```http
Authorization: Bearer <token>
```

---

## Security Notes

- Passwords are hashed using bcrypt before storage.
- Password hashes are never returned in API responses.
- Authentication uses JWT access tokens.
- Email addresses are normalized to lowercase before storage.
- Protected routes require valid JWT authentication.

---

## Related Files

```text
models/user.model.js
repositories/user.repository.js
services/auth.service.js
controllers/auth.controller.js
middlewares/auth.middleware.js
validators/auth.validator.js
```
# Beneficiary Model Documentation

## Overview

The Beneficiary model stores beneficiary account information for users.

Beneficiaries are accounts that users frequently transfer funds to and want to save for quick access.

---

# Schema Definition

```js
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    beneficiaryAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },

    nickname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    }
}
```

---

# Fields

## userId

### Type

```js
ObjectId
```

### Reference

```js
User
```

### Description

Represents the owner of the beneficiary.

Example:

```js
686d123456789abcdef11111
```

---

## beneficiaryAccountId

### Type

```js
ObjectId
```

### Reference

```js
Account
```

### Description

Represents the account added as a beneficiary.

Example:

```js
686d123456789abcdef22222
```

---

## nickname

### Type

```js
String
```

### Description

A custom name assigned by the user to identify the beneficiary.

Examples:

```text
Brother
Mom
Salary Account
Friend
```

### Validation Rules

```js
required: true
minlength: 2
maxlength: 50
trim: true
```

---

# Timestamps

Enabled using:

```js
timestamps: true
```

Automatically generates:

```js
createdAt
updatedAt
```

Example:

```json
{
  "createdAt": "2026-07-09T12:00:00.000Z",
  "updatedAt": "2026-07-09T12:00:00.000Z"
}
```

---

# Relationships

## User → Beneficiary

```text
One User
    ↓
Many Beneficiaries
```

A single user can have multiple beneficiaries.

---

## Account → Beneficiary

```text
One Account
    ↓
Many Beneficiary References
```

Multiple users may add the same account as a beneficiary.

---

# Indexes

## Unique Compound Index

```js
beneficiarySchema.index(
    {
        userId: 1,
        beneficiaryAccountId: 1
    },
    {
        unique: true
    }
)
```

Purpose:

- Prevent duplicate beneficiaries.
- Improve lookup performance.
- Enforce data integrity.

---

# Business Rules

1. A beneficiary must belong to a valid user.
2. A beneficiary must reference an existing account.
3. Users cannot add their own accounts as beneficiaries.
4. Duplicate beneficiaries are not allowed.
5. Beneficiaries can be removed by their owner only.
6. Nicknames must be between 2 and 50 characters.

---

# Example Document

```json
{
  "_id": "686d123456789abcdef12345",
  "userId": "686d123456789abcdef11111",
  "beneficiaryAccountId": "686d123456789abcdef22222",
  "nickname": "Brother",
  "createdAt": "2026-07-09T12:00:00.000Z",
  "updatedAt": "2026-07-09T12:00:00.000Z"
}
```
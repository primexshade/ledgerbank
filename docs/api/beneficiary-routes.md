# Beneficiary Routes Documentation

## Overview

The Beneficiary Module allows authenticated users to manage beneficiary accounts for quick and secure fund transfers.

Base URL:

```http
/api/v1/beneficiaries
```

Authentication:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 1. Add Beneficiary

## Endpoint

```http
POST /api/v1/beneficiaries
```

## Description

Adds a new beneficiary account for the authenticated user.

## Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## Request Body

```json
{
  "accountNumber": "LB10000002",
  "nickname": "Brother"
}
```

## Success Response

```json
{
  "success": true,
  "message": "Beneficiary added successfully",
  "data": {
    "_id": "686d123456789abcdef12345",
    "userId": "686d123456789abcdef11111",
    "beneficiaryAccountId": "686d123456789abcdef22222",
    "nickname": "Brother",
    "createdAt": "2026-07-09T12:00:00.000Z",
    "updatedAt": "2026-07-09T12:00:00.000Z"
  }
}
```

## Possible Errors

### Account Not Found

```json
{
  "success": false,
  "message": "Account not found"
}
```

### Duplicate Beneficiary

```json
{
  "success": false,
  "message": "Beneficiary already exists"
}
```

### Own Account

```json
{
  "success": false,
  "message": "You cannot add your own account as beneficiary"
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Nickname is required"
}
```

---

# 2. Get Beneficiaries

## Endpoint

```http
GET /api/v1/beneficiaries
```

## Description

Returns all beneficiaries belonging to the authenticated user.

## Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

## Success Response

```json
{
  "success": true,
  "message": "Beneficiaries retrieved successfully",
  "data": [
    {
      "_id": "686d123456789abcdef12345",
      "nickname": "Brother",
      "beneficiaryAccountId": {
        "_id": "686d123456789abcdef22222",
        "accountNumber": "LB10000002",
        "accountType": "SAVINGS",
        "balance": 5000
      }
    }
  ]
}
```

---

# 3. Delete Beneficiary

## Endpoint

```http
DELETE /api/v1/beneficiaries/:id
```

## Description

Removes a beneficiary belonging to the authenticated user.

## Request Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

## URL Parameters

| Parameter | Type | Description |
|------------|------|-------------|
| id | String | Beneficiary ID |

Example:

```http
DELETE /api/v1/beneficiaries/686d123456789abcdef12345
```

## Success Response

```json
{
  "success": true,
  "message": "Beneficiary removed successfully",
  "data": null
}
```

## Possible Errors

### Beneficiary Not Found

```json
{
  "success": false,
  "message": "Beneficiary not found"
}
```

### Unauthorized Access

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

---

# Business Rules

- User must be authenticated.
- Beneficiary account must exist.
- Users cannot add their own accounts as beneficiaries.
- Duplicate beneficiaries are not allowed.
- Users can only view their own beneficiaries.
- Users can only remove their own beneficiaries.
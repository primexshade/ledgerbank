# Account API

## Controller Responsibilities

The account controller:

- Receives HTTP requests
- Extracts authenticated user information
- Delegates business logic to the service layer
- Returns standardized API responses

The controller does not contain business logic.

---

## Base Route

```http
/api/v1/accounts
```

---

## Create Account

Creates a new bank account for the authenticated user.

### Endpoint

```http
POST /api/v1/accounts
```

### Authentication

Required

```http
Authorization: Bearer <token>
```

### Request Body

```json
{
    "accountType": "SAVINGS"
}
```

### Supported Account Types

| Type | Description |
|--------|--------|
| SAVINGS | Standard personal banking account |
| CURRENT | Business or high-volume transaction account |

### Success Response

Status Code:

```http
201 Created
```

Response:

```json
{
    "success": true,
    "message": "Account created successfully",
    "data": {
        "_id": "6867abc1234567890abcdef1",
        "accountNumber": "LB1783167610849",
        "userId": "6867abc1234567890abcdef0",
        "accountType": "SAVINGS",
        "balance": 0,
        "status": "ACTIVE",
        "createdAt": "2026-07-04T12:00:00.000Z",
        "updatedAt": "2026-07-04T12:00:00.000Z"
    }
}
```

### Business Rules

- Every account belongs to a valid user.
- Account numbers are generated automatically.
- Default account type is `SAVINGS`.
- Default balance is `0`.
- Default account status is `ACTIVE`.

---

## Get My Accounts

Retrieves all bank accounts belonging to the authenticated user.

### Endpoint

```http
GET /api/v1/accounts/me
```

### Authentication

Required

```http
Authorization: Bearer <token>
```

### Success Response

Status Code:

```http
200 OK
```

Response:

```json
{
    "success": true,
    "message": "Accounts fetched successfully",
    "data": [
        {
            "_id": "6867abc1234567890abcdef1",
            "accountNumber": "LB1783167610849",
            "accountType": "SAVINGS",
            "balance": 5000,
            "status": "ACTIVE"
        }
    ]
}
```

---

## Error Response

Example:

```json
{
    "success": false,
    "message": "Error message",
    "data": null
}
```

Common Errors:

| Status Code | Description |
|------------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

## Notes

- A user can own multiple accounts.
- All account routes require authentication.
- Account balances cannot be negative.
- Account numbers must be unique.
- Account information is stored in the Account collection.

---

## Related Files

```text
src/
├── controllers/
│   └── account.controller.js
│
├── services/
│   └── account.service.js
│
├── repositories/
│   └── account.repository.js
│
├── models/
│   └── account.model.js
│
└── routes/
    └── account.routes.js
```
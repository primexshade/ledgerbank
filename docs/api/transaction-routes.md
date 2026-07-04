# Transaction API

Base Route:

```http
/api/v1/transactions
```

---

## Deposit

```http
POST /api/v1/transactions/deposit
```

Authentication Required: Yes

Request Body:

```json
{
  "accountNumber": "LB123456789",
  "amount": 1000
}
```

---

## Withdraw

```http
POST /api/v1/transactions/withdraw
```

Authentication Required: Yes

Request Body:

```json
{
  "accountNumber": "LB123456789",
  "amount": 500
}
```

---

## Transfer

```http
POST /api/v1/transactions/transfer
```

Authentication Required: Yes

Request Body:

```json
{
  "fromAccountNumber": "LB111111111",
  "toAccountNumber": "LB222222222",
  "amount": 250
}
```

---

## Transaction History

```http
GET /api/v1/transactions/history/:accountNumber
```

Authentication Required: Yes
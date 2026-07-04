# JWT Authentication

LedgerBank uses JSON Web Tokens (JWT) for authentication.

## Token Payload

```json
{
    "userId": "...",
    "email": "...",
    "role": "USER"
}
```

## Expiration

```text
1 day
```

## Authorization Header

```http
Authorization: Bearer <token>
```

Authenticated routes use the token payload to populate:

```js
req.user
```
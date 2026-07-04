# Duplicate Reference Index Bug

## Date

2026-07-04

---

## Issue

Fund transfer failed with:

```text
E11000 duplicate key error
collection: transactions
index: reference_1
```

---

## Root Cause

The transaction schema defined:

```js
reference: {
    type: String,
    required: true,
    unique: true,
}
```

Fund transfers create:

1. Sender transaction
2. Receiver transaction

Both transactions intentionally share the same reference number.

MongoDB rejected the second insert because of the unique index.

---

## Impact

Balances were updated successfully.

Sender transaction was created.

Receiver transaction failed.

Result:

- Sender balance changed
- Receiver balance changed
- Receiver transaction history missing

---

## Fix

Removed:

```js
unique: true
```

from the schema.

Deleted:

```text
reference_1
```

index from MongoDB Atlas.

---

## Lesson Learned

Changing a Mongoose schema does not automatically remove indexes from MongoDB.

Indexes must be removed separately from the database.

This issue demonstrates why production banking systems use database transactions and rollback mechanisms.
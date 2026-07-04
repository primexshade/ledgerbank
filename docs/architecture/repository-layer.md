# Repository Layer

The repository layer is responsible for database access.

Responsibilities:

- Create database records
- Retrieve database records
- Update database records
- Delete database records

Repositories do not contain business logic.

Business validation is handled by the service layer.

---

## Transaction Repository

### createTransaction()

Creates a new transaction document.

### findTransactionByAccountId()

Returns transaction history for a specific account.

Transactions are sorted from newest to oldest.
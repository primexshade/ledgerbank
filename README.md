# LedgerBank

A secure banking backend application built using Node.js, Express.js, MongoDB, and JWT authentication.

LedgerBank demonstrates a production-inspired backend architecture with authentication, account management, transaction processing, and comprehensive project documentation.

---

## Features

### Authentication

- User Registration
- User Login
- JWT-Based Authentication
- Password Hashing using bcrypt
- Protected Routes

### Account Management

- Create Bank Accounts
- View User Accounts
- Account Status Management

### Transactions

- Deposit Funds
- Withdraw Funds
- Transfer Funds Between Accounts
- Transaction History Tracking
- Shared Transaction Reference System

### Architecture

- Layered Architecture
- Repository Pattern
- Service Layer Business Logic
- Request Validation
- Centralized Response Handling

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Tokens (JWT)
- bcrypt

### Development Tools

- ESLint
- Prettier

---

## Project Structure

```text
src/
│
├── controllers/
├── routes/
├── validators/
├── services/
├── repositories/
├── middlewares/
├── models/
├── utils/
└── config/

docs/
│
├── api/
├── models/
├── architecture/
└── bugs/
```

---

## Architecture Flow

```text
Routes
 ↓
Controllers
 ↓
Validators
 ↓
Services
 ↓
Repositories
 ↓
Models
 ↓
MongoDB
```

---

## Authentication Flow

```text
Login Request
      ↓
Controller
      ↓
Validation
      ↓
Service
      ↓
Repository
      ↓
MongoDB
      ↓
JWT Generation
      ↓
Access Token Returned
```

---

## API Documentation

Project documentation is available in:

```text
docs/api/
```

Includes:

- Authentication APIs
- Account APIs
- Transaction APIs

---

## Model Documentation

```text
docs/models/
```

Includes:

- User Model
- Account Model
- Transaction Model

---

## Architecture Documentation

```text
docs/architecture/
```

Includes:

- JWT Authentication
- Request Flow
- Layer Responsibilities

---

## Security Features

- Password Hashing
- JWT Authentication
- Protected Routes
- Unique User Emails
- Input Validation
- Authentication Middleware

---

## Future Enhancements

- Refresh Tokens
- Email Verification
- Password Reset
- Beneficiary Management
- Admin Dashboard
- Docker Support
- AWS Deployment
- Audit Logs
- Role-Based Permissions

---

## Author

Aryan Tiwari

B.Tech Computer Science & Engineering

SRM Institute of Science and Technology
# CRM API Documentation

## Overview
This is a complete REST API for a Customer Relationship Management (CRM) system built with NestJS, Prisma, and PostgreSQL. The API implements JWT-based authentication with role-based access control (RBAC).

## Base URL
```
http://localhost:3000
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Roles
- **ADMIN**: Full access to all resources
- **EMPLOYEE**: Limited read access and can only manage their assigned tasks

---

## 1. Authentication Module

### 1.1 Register User
Creates a new user account.

**Endpoint:** `POST /auth/register`

**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "EMPLOYEE"
}
```

**Validation Rules:**
- `name`: Required, string
- `email`: Required, unique, valid email format
- `password`: Required, minimum 8 characters
- `role`: Required, enum (ADMIN or EMPLOYEE)

**Success Response (201):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "EMPLOYEE",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input data
- `409 Conflict`: Email already exists

---

### 1.2 Login
Authenticates a user and returns JWT token.

**Endpoint:** `POST /auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "EMPLOYEE"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials

---

## 2. Users Module (ADMIN Only)

### 2.1 Get All Users
Returns a list of all users.

**Endpoint:** `GET /users`

**Access:** ADMIN only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Success Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "EMPLOYEE",
    "createdAt": "2024-01-28T10:00:00.000Z"
  },
  {
    "id": "uuid",
    "name": "Jane Admin",
    "email": "jane@example.com",
    "role": "ADMIN",
    "createdAt": "2024-01-28T09:00:00.000Z"
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN

---

### 2.2 Get User by ID
Returns a single user by ID.

**Endpoint:** `GET /users/:id`

**Access:** ADMIN only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**URL Parameters:**
- `id`: User UUID

**Success Response (200):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "EMPLOYEE",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN
- `404 Not Found`: User not found

---

### 2.3 Update User Role
Updates a user's role.

**Endpoint:** `PATCH /users/:id`

**Access:** ADMIN only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**URL Parameters:**
- `id`: User UUID

**Request Body:**
```json
{
  "role": "ADMIN"
}
```

**Success Response (200):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "ADMIN",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T12:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN
- `404 Not Found`: User not found
- `400 Bad Request`: Invalid role value

---

## 3. Customers Module

### 3.1 Create Customer
Creates a new customer record.

**Endpoint:** `POST /customers`

**Access:** ADMIN only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "name": "ABC Corporation",
  "email": "contact@abc.com",
  "phone": "1234567890",
  "company": "ABC Corp"
}
```

**Validation Rules:**
- `name`: Required, string
- `email`: Required, unique, valid email format
- `phone`: Required, unique, string
- `company`: Optional, string

**Success Response (201):**
```json
{
  "id": "uuid",
  "name": "ABC Corporation",
  "email": "contact@abc.com",
  "phone": "1234567890",
  "company": "ABC Corp",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN
- `409 Conflict`: Email or phone already exists
- `400 Bad Request`: Invalid input data

---

### 3.2 Get All Customers (Paginated)
Returns a paginated list of customers.

**Endpoint:** `GET /customers`

**Access:** ADMIN and EMPLOYEE

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example:** `GET /customers?page=1&limit=10`

**Success Response (200):**
```json
{
  "page": 1,
  "limit": 10,
  "totalRecords": 25,
  "totalPages": 3,
  "data": [
    {
      "id": "uuid",
      "name": "ABC Corporation",
      "email": "contact@abc.com",
      "phone": "1234567890",
      "company": "ABC Corp",
      "createdAt": "2024-01-28T10:00:00.000Z",
      "updatedAt": "2024-01-28T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Invalid role

---

### 3.3 Get Customer by ID
Returns a single customer by ID.

**Endpoint:** `GET /customers/:id`

**Access:** ADMIN and EMPLOYEE

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
- `id`: Customer UUID

**Success Response (200):**
```json
{
  "id": "uuid",
  "name": "ABC Corporation",
  "email": "contact@abc.com",
  "phone": "1234567890",
  "company": "ABC Corp",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Invalid role
- `404 Not Found`: Customer not found

---

### 3.4 Update Customer
Updates customer details.

**Endpoint:** `PATCH /customers/:id`

**Access:** ADMIN only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**URL Parameters:**
- `id`: Customer UUID

**Request Body (all fields optional):**
```json
{
  "name": "ABC Corporation Updated",
  "email": "new@abc.com",
  "phone": "9876543210",
  "company": "ABC Corp Ltd"
}
```

**Success Response (200):**
```json
{
  "id": "uuid",
  "name": "ABC Corporation Updated",
  "email": "new@abc.com",
  "phone": "9876543210",
  "company": "ABC Corp Ltd",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T12:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN
- `404 Not Found`: Customer not found
- `409 Conflict`: Email or phone already exists

---

### 3.5 Delete Customer
Deletes a customer record.

**Endpoint:** `DELETE /customers/:id`

**Access:** ADMIN only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**URL Parameters:**
- `id`: Customer UUID

**Success Response (200):**
```json
{
  "id": "uuid",
  "name": "ABC Corporation",
  "email": "contact@abc.com",
  "phone": "1234567890",
  "company": "ABC Corp",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN
- `404 Not Found`: Customer not found

---

## 4. Tasks Module

### 4.1 Create Task
Creates a new task and assigns it to an employee.

**Endpoint:** `POST /tasks`

**Access:** ADMIN only

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:**
```json
{
  "title": "Follow up with customer",
  "description": "Call customer to discuss contract renewal",
  "assignedToId": "employee_uuid",
  "customerId": "customer_uuid",
  "status": "PENDING"
}
```

**Validation Rules:**
- `title`: Required, string
- `description`: Optional, string
- `assignedToId`: Required, must be a valid EMPLOYEE user UUID
- `customerId`: Required, must be a valid customer UUID
- `status`: Optional, enum (PENDING, IN_PROGRESS, DONE), default: PENDING

**Success Response (201):**
```json
{
  "id": "uuid",
  "title": "Follow up with customer",
  "description": "Call customer to discuss contract renewal",
  "status": "PENDING",
  "assignedToId": "employee_uuid",
  "customerId": "customer_uuid",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T10:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: User is not an ADMIN
- `404 Not Found`: Customer or assigned user not found
- `400 Bad Request`: assignedTo user is not an EMPLOYEE

---

### 4.2 Get All Tasks
Returns tasks based on user role.

**Endpoint:** `GET /tasks`

**Access:** ADMIN and EMPLOYEE

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Rules:**
- **ADMIN**: Returns all tasks
- **EMPLOYEE**: Returns only tasks assigned to them

**Success Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Follow up with customer",
    "description": "Call customer to discuss contract renewal",
    "status": "PENDING",
    "assignedToId": "employee_uuid",
    "customerId": "customer_uuid",
    "createdAt": "2024-01-28T10:00:00.000Z",
    "updatedAt": "2024-01-28T10:00:00.000Z",
    "assignedTo": {
      "id": "employee_uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "customer": {
      "id": "customer_uuid",
      "name": "ABC Corporation",
      "email": "contact@abc.com",
      "phone": "1234567890"
    }
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: Invalid role

---

### 4.3 Update Task Status
Updates the status of a task.

**Endpoint:** `PATCH /tasks/:id/status`

**Access:** ADMIN and EMPLOYEE (with restrictions)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
- `id`: Task UUID

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Validation Rules:**
- `status`: Required, enum (PENDING, IN_PROGRESS, DONE)

**Access Rules:**
- **ADMIN**: Can update any task
- **EMPLOYEE**: Can only update tasks assigned to them

**Success Response (200):**
```json
{
  "id": "uuid",
  "title": "Follow up with customer",
  "description": "Call customer to discuss contract renewal",
  "status": "IN_PROGRESS",
  "assignedToId": "employee_uuid",
  "customerId": "customer_uuid",
  "createdAt": "2024-01-28T10:00:00.000Z",
  "updatedAt": "2024-01-28T11:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `403 Forbidden`: EMPLOYEE trying to update someone else's task
- `404 Not Found`: Task not found
- `400 Bad Request`: Invalid status value

---

## Error Response Format

All errors follow a consistent format:

```json
{
  "statusCode": 400,
  "message": "Error message description",
  "error": "Bad Request"
}
```

Common HTTP Status Codes:
- `200 OK`: Successful GET, PATCH, DELETE
- `201 Created`: Successful POST
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource (email/phone)
- `500 Internal Server Error`: Server error

---

## Swagger Documentation

Access the interactive Swagger UI at:
```
http://localhost:3000/api
```

The Swagger UI allows you to:
1. View all endpoints with detailed documentation
2. Test API endpoints directly from the browser
3. Authenticate using JWT tokens
4. View request/response schemas

### How to Test Protected Routes in Swagger:

1. First, register or login to get a JWT token
2. Click the **"Authorize"** button (🔓 icon) at the top right
3. Enter: `Bearer <your_jwt_token>`
4. Click "Authorize"
5. Now you can test all protected endpoints

---

## Database Schema

### User Table
```
id          UUID (PK)
name        String
email       String (Unique)
password    String (Hashed)
role        Enum (ADMIN, EMPLOYEE)
createdAt   DateTime
updatedAt   DateTime
```

### Customer Table
```
id          UUID (PK)
name        String
email       String (Unique)
phone       String (Unique)
company     String (Optional)
createdAt   DateTime
updatedAt   DateTime
```

### Task Table
```
id            UUID (PK)
title         String
description   String (Optional)
status        Enum (PENDING, IN_PROGRESS, DONE)
assignedToId  UUID (FK -> User)
customerId    UUID (FK -> Customer)
createdAt     DateTime
updatedAt     DateTime
```

---

## Security Notes

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **JWT Tokens**: Tokens include userId and role claims
3. **Password in Responses**: Passwords are never returned in any API response
4. **Role-Based Access**: Endpoints enforce role-based access control
5. **Input Validation**: All inputs are validated using DTOs and class-validator

---


## Testing Credentials

After registration, you can use these test flows:

### Admin Flow:
1. Register with role "ADMIN"
2. Login to get token
3. Access all endpoints

### Employee Flow:
1. Register with role "EMPLOYEE"
2. Login to get token
3. Can read customers
4. Can only view/update own tasks

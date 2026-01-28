# CRM Backend Application

A **Role-Based CRM Backend System** built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **JWT Authentication**.

This system supports **Admin & Employee roles** with secure authentication, customer management, task assignment, and role-based access control (RBAC).

---

## 🚀 Tech Stack

- **Backend Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **API Documentation:** Swagger
- **Validation:** class-validator, class-transformer
- **Password Hashing:** bcrypt

---

## 📌 Features

- ✅ Role-based authentication (ADMIN & EMPLOYEE)
- ✅ Secure JWT-based login system
- ✅ Customer management with pagination
- ✅ Employee creation & role management
- ✅ Task assignment & tracking
- ✅ Role-based access control using Guards
- ✅ Prisma ORM with migrations
- ✅ Interactive Swagger API documentation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v13 or higher)
- **npm** or **yarn**

Verify installations:

```bash
node -v
npm -v
psql --version
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd crm-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root directory:

#### `.env`

```env
DATABASE_URL="postgresql://username:password@localhost:5432/crm_db?schema=public"
```

**Replace the following placeholders:**
- `username` → Your PostgreSQL username
- `password` → Your PostgreSQL password
- `crm_db` → Your database name

---

## 🗄️ Database Migration Steps

### Step 1: Generate Prisma Client

```bash
npx prisma generate
```

This generates the Prisma Client based on your schema.

### Step 2: Run Database Migrations

```bash
npx prisma migrate dev --name init
```

This command will:
- Create all required database tables
- Apply the schema to your PostgreSQL database
- Generate the Prisma Client

### Step 3 (Optional): Open Prisma Studio

View and edit your database records using Prisma Studio:

```bash
npx prisma studio
```

Access Prisma Studio at: `http://localhost:5555`

---

## ▶️ Starting the Server

### Development Mode

```bash
npm run start:dev
```

The server will start at: **`http://localhost:3000`**

---

## 📚 Swagger API Documentation

Interactive API documentation is available via Swagger UI.

**Access Swagger at:** **`http://localhost:3000/api`**

### Features:
- 🔍 Browse all available endpoints
- 🧪 Test API requests directly from the browser
- 🔐 Authenticate using JWT tokens
- 📖 View request/response schemas

### How to Authenticate in Swagger:

1. Click the **Authorize** button (🔒 icon)
2. Enter your JWT token in the format:
   ```
   Bearer <your_jwt_token>
   ```
3. Click **Authorize**
4. You can now access protected endpoints

### 📄 Additional Documentation

For complete API endpoint documentation and testing:

- **API Documentation:** Refer to `API_DOCUMENTATION.md` for detailed endpoint specifications, request/response formats, and examples
- **Postman Collection:** Use `CRM_API_Postman_Collection.json` for comprehensive API testing with pre-configured requests

---

## 🔐 Authentication Flow

### Testing Order:

1. **Register Admin**
   - `POST /auth/register`
   - Create an admin account

2. **Login Admin**
   - `POST /auth/login`
   - Receive JWT token

3. **Create Employees**
   - `POST /users`
   - Admin creates employee accounts

4. **Create Customers**
   - `POST /customers`
   - Add customer records

5. **Create Tasks**
   - `POST /tasks`
   - Admin assigns tasks to employees

6. **Employee Login**
   - `POST /auth/login`
   - Employee logs in and views assigned tasks

---

## 🛡️ Role-Based Access Control

| Endpoint | ADMIN | EMPLOYEE |
|----------|-------|----------|
| `/users` (Create) | ✅ | ❌ |
| `/customers` (CRUD) | ✅ | ❌ |
| `/tasks` (Create) | ✅ | ❌ |
| `/tasks` (View) | ✅ All | ✅ Own only |
| `/tasks/:id/status` | ✅ | ✅ Own only |

---

## 🛠️ Useful Commands

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start development server |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma migrate reset` | Reset database |
| `npx prisma studio` | Open Prisma Studio GUI |

---

## 🐛 Troubleshooting

### Issue: Prisma Client Not Found

**Solution:**
```bash
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client
npm install
npx prisma generate
```

### Issue: Database Connection Failed

**Check:**
- PostgreSQL service is running
- `DATABASE_URL` in `.env` is correct
- Database credentials are valid
- Database exists

### Issue: JWT Unauthorized Error

**Ensure:**
- JWT token is valid and not expired
- Authorization header format: `Bearer <token>`
- Token is correctly copied from login response

---

## 📂 Project Structure

```
crm-backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── auth/
│   ├── users/
│   ├── customers/
│   ├── tasks/
│   ├── prisma/
│   └── common/
├── .env
└── package.json
```

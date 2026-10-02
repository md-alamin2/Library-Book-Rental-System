# 📚 Library Book Rental System API

> A professional-grade Node.js/Express REST API for comprehensive library book inventory and loan management with JWT authentication, role-based access control, and automatic overdue fine calculation.

**Live API:** [https://library-book-rental-system-three.vercel.app/](https://library-book-rental-system-three.vercel.app/)

---

## Overview

A robust Node.js/Express API for managing a library's book inventory, member accounts, and book loans. Built with TypeScript for type safety and PostgreSQL for reliable data persistence.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure token-based user registration and login |
| 👤 **Member Management** | Create, retrieve, and update member profiles with role-based access |
| 📖 **Book Management** | Add, view, update, and manage books with available-copy tracking |
| 🔄 **Loan System** | Create loans, mark returns, track active/returned/overdue status |
| 🛡️ **Role-Based Access** | Librarian and Member roles with appropriate permissions |
| 🚫 **Deletion Constraints** | Prevent deletion of members/books with active loans |
| 💰 **Automatic Fine Calculation** | Overdue fines calculated on return based on days late |
| 📊 **Standardized Responses** | Consistent JSON error response structure across all endpoints |

---

## 🛠 Technology Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | PostgreSQL |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Security** | bcrypt |
| **Dev Runtime** | tsx |

---

## 📁 Project Structure

```
src/
├── server.ts                 # Main application entry point
├── app.ts                    # Express app configuration
├── config/
│   ├── db.ts                 # Database connection pool
│   └── index.ts              # Configuration exports
├── middleware/
│   └── verifyRole.ts         # Role-based authentication middleware
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.routes.ts
│   ├── member/
│   │   ├── member.controller.ts
│   │   ├── member.service.ts
│   │   └── member.routes.ts
│   ├── book/
│   │   ├── book.controller.ts
│   │   ├── book.service.ts
│   │   └── book.routes.ts
│   └── loan/
│       ├── loan.controller.ts
│       ├── loan.service.ts
│       └── loan.routes.ts
└── type/
    └── express/
        └── index.d.ts
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd library-book-rental-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root with the following variables:

```env
CONNECTION_STR=library_rental_db
SECRET_STR=your_secure_jwt_secret_key
JWT_EXPIRATION=7d
PORT=5000
NODE_ENV=development
```

---

## ▶️ Running the Application

### Development Mode (with Hot Reload)
```bash
npm run dev
```

### Production Build
```bash
npx tsc
```

---

## 📚 API Endpoints

All endpoints are organized by module with clear authentication requirements:
- 🔐 **Public** - No authentication required
- 🔒 **(Librarian & Member)** - Requires JWT token
- 🛡️ **(Librarian Only)** - Librarian role required

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | User Registration |
| POST | `/api/v1/auth/signin` | User Login |

**Register User**
```
POST https://library-book-rental-system-three.vercel.app/api/v1/auth/signup
```

**User Login**
```
POST https://library-book-rental-system-three.vercel.app/api/v1/auth/signin
```

---

### 👥 Members

| Method | Access | Endpoint | Description |
|--------|--------|----------|-------------|
| GET | 🛡️ Librarian Only | `/api/v1/members` | Retrieve all members |
| GET | 🔒 Librarian & Member | `/api/v1/members/:memberId` | Get specific member |
| PATCH | 🔒 Librarian & Member | `/api/v1/members/:memberId` | Update member profile |
| DELETE | 🛡️ Librarian Only | `/api/v1/members/:memberId` | Delete member account |

**Get All Members** 🛡️ (Librarian Only)
```
GET https://library-book-rental-system-three.vercel.app/api/v1/members
```

**Get Single Member** 🔒 (Librarian & Member)
```
GET https://library-book-rental-system-three.vercel.app/api/v1/members/:memberId
```

**Update Member Profile** 🔒 (Librarian & Member)
```
PATCH https://library-book-rental-system-three.vercel.app/api/v1/members/:memberId
```

**Delete Member** 🛡️ (Librarian Only)
```
DELETE https://library-book-rental-system-three.vercel.app/api/v1/members/:memberId
```

---

### 📖 Books

| Method | Access | Endpoint | Description |
|--------|--------|----------|-------------|
| POST | 🛡️ Librarian Only | `/api/v1/books` | Add new book |
| GET | 🔐 Public | `/api/v1/books` | List all books |
| GET | 🔐 Public | `/api/v1/books/:bookId` | Get book details |
| PATCH | 🛡️ Librarian Only | `/api/v1/books/:bookId` | Update book |
| DELETE | 🛡️ Librarian Only | `/api/v1/books/:bookId` | Delete book |

**Add New Book** 🛡️ (Librarian Only)
```
POST https://library-book-rental-system-three.vercel.app/api/v1/books
```

**Get All Books** 🔐
```
GET https://library-book-rental-system-three.vercel.app/api/v1/books
```

**Get Single Book** 🔐
```
GET https://library-book-rental-system-three.vercel.app/api/v1/books/:bookId
```

**Update Book** 🛡️ (Librarian Only)
```
PATCH https://library-book-rental-system-three.vercel.app/api/v1/books/:bookId
```

**Delete Book** 🛡️ (Librarian Only)
```
DELETE https://library-book-rental-system-three.vercel.app/api/v1/books/:bookId
```

---

### 🔄 Loans

| Method | Access | Endpoint | Description |
|--------|--------|----------|-------------|
| POST | 🔒 Librarian & Member | `/api/v1/loans` | Create new loan (borrow a book) |
| GET | 🔒 Librarian & Member | `/api/v1/loans` | Get loans |
| PATCH | 🔒 Librarian & Member | `/api/v1/loans/:loanId` | Return a book / update loan status |

**Create Loan** 🔒 (Librarian & Member)
```
POST https://library-book-rental-system-three.vercel.app/api/v1/loans
```

**Get All Loans** 🔒 (Librarian & Member)
```
GET https://library-book-rental-system-three.vercel.app/api/v1/loans
```

**Update Loan Status** 🔒 (Librarian & Member)
```
PATCH https://library-book-rental-system-three.vercel.app/api/v1/loans/:loanId
```

---

## 👨‍💻 Developer

**Your Name**
- 📧 Email: [mdalamin22671@gmail.com](mailto:mdalamin22671@gmail.com)
- 🔗 GitHub: [github.com/md-alamin2](https://github.com/md-alamin2)

---

## 📎 License

This project is open source and available under the ISC License. Free to use for learning and portfolio purposes.
# Pocketwise — MERN Expense Tracker

A full-stack, production-ready **Expense Tracker** built with MongoDB, Express, React, and Node.js (MERN).

Track income and expenses, categorize transactions, search and filter your history, and visualize spending trends on a modern dashboard.

---

## Features

- **Authentication** — Register, login, logout, JWT-based sessions, protected routes
- **Dashboard** — Total income, total expense, current balance, 6-month trend chart, category breakdown chart, recent transactions
- **Transactions** — Create, edit, delete, search, filter (type/category/date range), paginate
- **Categories** — Food, Transport, Shopping, Bills, Salary, Entertainment, Health, Education, Other
- **Profile** — Update name/email/currency, change password
- **Security** — Helmet, CORS, bcrypt password hashing, JWT auth, centralized request validation
- **Clean architecture** — MVC on the backend, component-based architecture on the frontend

---

##  Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Context API, Recharts
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, express-validator, Helmet, CORS, Morgan, dotenv
**Database:** MongoDB

> This project intentionally ships **without** Docker, docker-compose, Nginx, Kubernetes, or any deployment config. It's meant to be run locally with Node.js and MongoDB.

---

## Project Structure

```
expense-tracker/
├── backend/
│   ├── src/
│   │   ├── config/          # env config, MongoDB connection
│   │   ├── controllers/     # route handlers (thin, call services)
│   │   ├── middleware/      # auth guard, validation, error handling
│   │   ├── models/          # Mongoose schemas (User, Transaction)
│   │   ├── routes/          # Express routers
│   │   ├── services/        # business logic / DB queries
│   │   ├── utils/           # ApiError, ApiResponse, asyncHandler, JWT helper
│   │   ├── validations/     # express-validator rule sets
│   │   ├── app.js           # Express app (middleware + routes)
│   │   └── server.js        # entry point — connects DB, starts server
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # reusable UI (Button, Input, Modal, charts, tables...)
    │   ├── pages/            # route-level pages (Login, Dashboard, Transactions...)
    │   ├── layouts/          # AuthLayout, MainLayout (sidebar + navbar shell)
    │   ├── hooks/             # useAuth, useTransactions, useToast, useDebounce
    │   ├── services/          # Axios API clients per resource
    │   ├── context/           # AuthContext, TransactionContext, ToastContext
    │   ├── routes/            # AppRoutes, ProtectedRoute, PublicRoute
    │   ├── utils/              # shared constants & formatters
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

---

## ✅ Prerequisites

- **Node.js** v18 or higher ([download](https://nodejs.org))
- **MongoDB** running locally (v6+) or a MongoDB Atlas connection string
  - Local install guide: https://www.mongodb.com/docs/manual/installation/
  - Or use a free cluster at https://www.mongodb.com/cloud/atlas

---

## 🚀 Getting Started

The frontend and backend are two independent apps — run each in its **own terminal window**.

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and set your values:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=replace_this_with_a_long_random_secret_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

> Generate a strong `JWT_SECRET` with: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

Make sure MongoDB is running locally, then start the API:

```bash
npm run dev      # starts with nodemon (auto-restart on changes)
# or
npm start        # plain node
```

The API will be available at **http://localhost:5000**. Verify it's alive:

```bash
curl http://localhost:5000/api/health
```

### 2. Frontend setup

Open a **second terminal**:

```bash
cd frontend
npm install
cp .env.example .env
```

Open `frontend/.env` and confirm it points at your backend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

### 3. Use the app

1. Visit http://localhost:5173 — you'll land on the Login page.
2. Click "Create one" to register a new account.
3. You'll be redirected to the Dashboard. Click "Add transaction" to log your first income/expense.
4. Explore the Transactions page for search, filters, and pagination, and the Profile page to update your details.

---

## 🏗️ Building for production

**Frontend:**

```bash
cd frontend
npm run build      # outputs static files to frontend/dist
npm run preview    # preview the production build locally
```

Serve the contents of `frontend/dist` with any static file host of your choice (this repo intentionally does not include Nginx/Docker config — set that up separately if/when you deploy).

**Backend:**

```bash
cd backend
npm start           # NODE_ENV should be set to "production" in your environment
```

---

## 🔌 API Reference

All endpoints are prefixed with `/api`. Protected routes require an `Authorization: Bearer <token>` header.

### Auth (`/api/auth`)
| Method | Endpoint    | Access  | Description               |
|--------|-------------|---------|----------------------------|
| POST   | `/register` | Public  | Create a new account       |
| POST   | `/login`    | Public  | Log in, returns JWT        |
| POST   | `/logout`   | Private | No-op / client discards JWT|
| GET    | `/me`       | Private | Get the current user       |

### Users (`/api/users`)
| Method | Endpoint    | Access  | Description                    |
|--------|-------------|---------|----------------------------------|
| PATCH  | `/profile`  | Private | Update name / email / currency  |
| PATCH  | `/password` | Private | Change password                 |

### Transactions (`/api/transactions`)
| Method | Endpoint      | Access  | Description                                                        |
|--------|---------------|---------|----------------------------------------------------------------------|
| GET    | `/`           | Private | List transactions — supports `page`, `limit`, `type`, `category`, `search`, `startDate`, `endDate`, `sortBy`, `sortOrder` |
| GET    | `/categories` | Private | List available categories                                          |
| GET    | `/:id`        | Private | Get a single transaction                                            |
| POST   | `/`           | Private | Create a transaction                                                 |
| PATCH  | `/:id`        | Private | Update a transaction                                                 |
| DELETE | `/:id`        | Private | Delete a transaction                                                 |

### Dashboard (`/api/dashboard`)
| Method | Endpoint   | Access  | Description                                                                 |
|--------|------------|---------|-------------------------------------------------------------------------------|
| GET    | `/summary` | Private | Total income/expense/balance, N-month trend (`?months=`), category breakdown, recent transactions |

All responses follow the shape:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": { }
}
```

Errors follow:

```json
{
  "success": false,
  "message": "What went wrong",
  "errors": [{ "field": "email", "message": "Please provide a valid email address" }]
}
```

---

## 🔒 Security notes

- Passwords are hashed with **bcrypt** before being stored — plaintext passwords are never persisted or returned.
- All protected routes verify a **JWT** signed with `JWT_SECRET`; keep this value secret and unique per environment.
- **Helmet** sets sensible security headers; **CORS** is restricted to `CLIENT_URL`.
- All request bodies/queries are validated with **express-validator** before hitting a controller.
- Centralized error handling normalizes Mongoose, JWT, and validation errors into consistent API responses — stack traces are only included when `NODE_ENV=development`.

---

## 🧪 Troubleshooting

- **"MongoDB connection failed"** — confirm MongoDB is running (`mongod`) and `MONGO_URI` in `backend/.env` is correct.
- **CORS errors in the browser console** — confirm `CLIENT_URL` in `backend/.env` matches the URL the frontend is actually served from (default `http://localhost:5173`).
- **401 errors right after logging in** — check that `VITE_API_BASE_URL` in `frontend/.env` points at the running backend, and that the browser has localStorage enabled.
- **Port already in use** — change `PORT` in `backend/.env` (and update `VITE_API_BASE_URL` accordingly), or free up the port.

---

## 📄 License

MIT — use this project as a learning reference or a starting point for your own app.

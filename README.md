# FreshBite — Food Order Management System

Production-ready MERN application for browsing a food menu, managing a persistent cart, placing orders, and tracking live delivery status with Socket.io.

---

## Project Overview

FreshBite is a full-stack food delivery order management system built with:

| Layer | Stack |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, TanStack Query, React Hook Form + Zod, Socket.io Client |
| Backend | Node.js, Express, MongoDB, Mongoose, Socket.io, express-validator |
| Testing | Jest + Supertest (API), Vitest + React Testing Library (UI) |

Key capabilities:

- Browse a seeded menu of 12+ dishes with search, category, and sort filters
- Cart with quantity controls persisted in `localStorage`
- Validated checkout (name, phone, address, notes, payment method)
- Server-side order total calculation (never trusts client prices)
- Real-time order status progression every 10 seconds via Socket.io

---

## Architecture

```
Client (React)                  Server (Express)
──────────────                  ────────────────
Pages / Components
        │
React Query hooks  ──HTTP──►  Routes → Controllers → Services → Repositories → MongoDB
        │
Socket.io Client   ◄─WS────  Socket layer (status simulator)
        │
Cart Context (localStorage)
```

Backend follows a clean layered architecture:

**Route → Controller → Service → Repository → MongoDB**

Controllers never access Mongoose models directly. All business logic lives in services; data access lives in repositories. Everything is implemented with functions (no classes / OOP).

---

## Folder Structure

```
food-order-app/
├── client/                 # Vite React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── tests/
│   │   └── utils/
│   └── package.json
└── server/                 # Express API
    ├── src/
    │   ├── config/
    │   ├── constants/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   ├── repositories/
    │   ├── routes/
    │   ├── services/
    │   ├── socket/
    │   ├── tests/
    │   ├── utils/
    │   ├── validations/
    │   ├── app.js
    │   └── server.js
    └── package.json
```

---

## Installation

### Prerequisites

- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

### Backend

```bash
cd food-order-app/server
npm install
cp .env.example .env   # adjust if needed
npm run dev
```

API starts on `http://localhost:5000`. Menu seed data is inserted automatically when the `menus` collection is empty.

### Frontend

```bash
cd food-order-app/client
npm install
cp .env.example .env   # adjust if needed
npm run dev
```

App starts on `http://localhost:5173`.

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | API port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/freshbite-food-order` |
| `CLIENT_URL` | Allowed CORS origin | `http://localhost:5173` |

### Frontend (`client/.env`)

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_URL` | REST API base URL | `http://localhost:5000/api` |
| `VITE_SOCKET_URL` | Socket.io server URL | `http://localhost:5000` |

---

## Scripts

### Frontend

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Production build |
| `npm run test` | Run Vitest with coverage |
| `npm run preview` | Preview production build |

### Backend

| Script | Description |
| --- | --- |
| `npm run dev` | Start API with `--watch` |
| `npm run start` | Start API (production) |
| `npm run test` | Run Jest + Supertest with coverage |

---

## Deployment

### Frontend → Vercel

1. Set root directory to `client`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Environment variables:
   - `VITE_API_URL` → your Render API URL + `/api`
   - `VITE_SOCKET_URL` → your Render API URL

### Backend → Render

1. Set root directory to `server`
2. Start command: `npm run start`
3. Environment variables:
   - `PORT` (Render provides this)
   - `MONGO_URI` → MongoDB Atlas connection string
   - `CLIENT_URL` → your Vercel frontend URL

CORS is configured from `CLIENT_URL` for both HTTP and Socket.io.

---

## API Documentation

Base URL: `/api`

### Health

- `GET /api/health` → `{ success, message, data }`

### Menu

- `GET /api/menu`
  - Query: `category`, `search`, `sort` (`price`, `-price`, `rating`, `name`, `preparationTime`)
  - Example: `/api/menu?category=Pizza&sort=price`

### Orders

- `POST /api/orders` — create order
  ```json
  {
    "customer": {
      "name": "Jane Doe",
      "phone": "+1 555 000 1234",
      "address": "123 Market Street",
      "notes": "Leave at door"
    },
    "paymentMethod": "Cash On Delivery",
    "items": [{ "menuId": "<ObjectId>", "quantity": 2 }]
  }
  ```
  Server looks up menu prices and computes `total`.

- `GET /api/orders` — list all orders
- `GET /api/orders/:id` — order details (customer, items, total, status, timestamps, estimated delivery)
- `PATCH /api/orders/:id/status` — body `{ "status": "PREPARING" }`
- `DELETE /api/orders/:id` — delete order

### Order status flow

```
ORDER_RECEIVED → PREPARING → OUT_FOR_DELIVERY → DELIVERED
```

After an order is created, the server advances status every **10 seconds** and emits:

```
event: orderStatusUpdated
payload: { orderId, status, order }
```

### Error format

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "customer.phone", "message": "Phone number is invalid" }]
}
```

---

## Testing

```bash
# Backend
cd server && npm test

# Frontend
cd client && npm test
```

Coverage targets:

- Backend: menu CRUD-adjacent flows, order create/read/update/delete, validation, 404
- Frontend: FoodCard, Cart, CheckoutForm, StatusTimeline, React Query hooks

---

## Screenshots

> Placeholder — add screenshots after running the app locally.

| Screen | Path |
| --- | --- |
| Home / Menu | `/` |
| Checkout | `/checkout` |
| Order Success | `/orders/:id/success` |
| Order Tracking | `/orders/:id` |
| 404 | any unknown route |

---

## Future Improvements

- User authentication and order history per account
- Admin dashboard for manual status control and menu CRUD
- Stripe / Razorpay online payment integration
- Push notifications for status changes
- Image uploads for menu items
- Rate limiting and request logging for production hardening

---

## License

MIT

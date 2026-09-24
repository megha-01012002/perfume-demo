# ÉLORIA — Premium Perfume E-Commerce (MERN)

*"A Scent Worth Remembering."*

A full-stack, client-presentation-ready e-commerce site for a fictional
luxury perfume house, built with the MERN stack (MongoDB, Express,
React, Node.js).

---

## ⚠️ Read this first — what's real vs. mocked

This project was generated in a sandboxed environment with **no access
to a live MongoDB instance and no network access to install npm
packages**, so it could not be end-to-end tested here. Here's exactly
what that means for you:

- **Backend (`server/`)** — Complete Express + Mongoose API matching
  the spec: auth, products, cart, wishlist, orders, reviews, and a
  Razorpay-shaped payment flow with an automatic demo-mode fallback.
  Every file passed a Node.js syntax check, but it has **not** been run
  against a live MongoDB — run it locally and iron out anything that
  only shows up at runtime.
- **Frontend (`client/`)** — Complete React app covering every page in
  the spec, styled in the brand's palette with Framer Motion
  animations. It runs **fully standalone** against `localStorage`-backed
  mock services (see "Mock mode" below) so you can demo the whole
  shopping flow — browse, filter, wishlist, cart, checkout, demo
  payment, order history, admin dashboard — with zero backend running.
  Every file passed a full JSX/TS syntax check, but `npm install` /
  `npm run build` were never run here, so **you should be the first to
  build it** and fix anything only a real bundler would catch.
- **Product photography** — There's no real perfume photography in this
  build. Instead, every product renders through a generative SVG bottle
  illustration (`client/src/components/ProductArt.jsx`) so nothing
  looks broken or templated. See
  `client/public/images/products/README.md` for the exact swap-in
  point once you have real photography.

**Your first step should be:** `cd client && npm install && npm run dev`
— the app will run immediately in mock mode with no other setup.

---

## Features

- Home, Shop (filterable/sortable), Product Details, Collections,
  About, Wishlist, Cart, multi-step Checkout, Order Success,
  Login/Register, My Account (profile/orders/wishlist/addresses/
  settings), Contact, Search, Journal (blog), 404
- Admin dashboard: revenue/orders charts, product CRUD, order status
  management, customers, coupons
- Cart drawer, quick view modal, newsletter popup, cookie consent,
  toast notifications, skeleton loaders
- JWT auth via HTTP-only cookies, bcrypt password hashing
- Razorpay-shaped payment architecture with a built-in demo mode
- 16 seeded products, reviews, coupons, and demo customers

---

## Tech Stack

**Frontend:** React 18, Vite, React Router, Tailwind CSS, Framer
Motion, Axios, Context API, Lucide icons, Recharts (admin charts)

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt,
HTTP-only cookies, Razorpay SDK

---

## Project Structure

```
eloria/
├── client/                # React + Vite frontend
│   └── src/
│       ├── components/    # Reusable UI (Navbar, ProductCard, modals...)
│       ├── pages/          # Route-level pages (+ pages/admin)
│       ├── layouts/        # MainLayout, AdminLayout
│       ├── context/        # Cart, Wishlist, Auth, Toast (React Context)
│       ├── services/       # API calls — real endpoints + mock fallback
│       └── data/           # Demo product/collection/journal content
└── server/                 # Express + MongoDB backend
    ├── controllers/
    ├── models/              # User, Product, Cart, Wishlist, Order, Coupon, Review
    ├── routes/
    ├── middleware/          # auth, admin, error handling
    ├── seed/seed.js         # Seeds 16 products, users, coupons, reviews
    └── server.js
```

---

## Getting Started

### 1. Frontend only (fastest — no backend needed)

```bash
cd client
npm install
cp .env.example .env   # defaults are already correct for mock mode
npm run dev
```

Open `http://localhost:5173`. The app runs entirely on mock,
`localStorage`-backed services — no MongoDB, no backend server needed.
Log in with the demo credentials below.

### 2. Full stack (real backend + MongoDB)

**Backend:**

```bash
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, and (optionally) Razorpay keys
npm run seed     # seeds products, users, coupons, reviews
npm run dev      # starts the API on http://localhost:5000
```

**Frontend:**

```bash
cd client
npm install
cp .env.example .env
# edit .env: set VITE_USE_MOCK_API=false
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:5000` (see
`client/vite.config.js`), so no CORS setup is needed in development.

---

## Environment Variables

### `server/.env`

```env
MONGO_URI=mongodb://127.0.0.1:27017/eloria
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Leave `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` blank to run payments
in demo mode (see `server/controllers/paymentController.js`) — the full
checkout flow still works, just without hitting Razorpay's real API.

### `client/.env`

```env
VITE_API_URL=/api
VITE_USE_MOCK_API=true
```

---

## Demo Credentials

**Admin** — `admin@eloria.com` / `Admin@123`
**Customer** — `demo@eloria.com` / `Demo@123`

*(Demo-only accounts — do not use these patterns in production.)*

## Demo Coupons

| Code | Discount | Minimum Order |
|---|---|---|
| `ELORIA10` | 10% off | — |
| `WELCOME15` | 15% off | ₹5,000 |
| `FIRSTORDER` | ₹500 off | ₹4,000 |

---

## Razorpay Setup (optional, for real payments)

1. Create an account at [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Generate API keys under **Settings → API Keys**
3. Add them to `server/.env` as `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`
4. Restart the server — `paymentController.js` automatically switches
   from demo mode to live Razorpay orders once both keys are present

---

## Production Deployment Notes

- Set `NODE_ENV=production` on the server — this makes auth cookies
  `secure` and `sameSite: none`, required for cross-domain cookies in
  production
- Point `CLIENT_URL` at your deployed frontend origin (for CORS)
- Point the frontend's `VITE_API_URL` at your deployed API origin
- Use a managed MongoDB instance (e.g. MongoDB Atlas) for `MONGO_URI`
- Generate a strong, random `JWT_SECRET` — never reuse the example value
- Serve the frontend build (`npm run build` → `client/dist`) via any
  static host (Vercel, Netlify, S3 + CloudFront, etc.)

---

## Known Gaps / Next Steps

- Replace `ProductArt.jsx` placeholder illustrations with real product
  photography (see `client/public/images/products/README.md`)
- The admin dashboard's charts and the Orders/Customers/Coupons tables
  use local demo data on the frontend rather than live API calls —
  wire them to `GET /api/orders`, a future `GET /api/admin/customers`,
  etc. as needed
- Add automated tests (none are included)
- `npm install` and a full build have not been run/verified in this
  environment — do this first before anything else

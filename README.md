# Ecommerce Fullstack Design

A full-stack e-commerce web application built with **React + Vite** (frontend) and **Express.js** (backend).

## 🚀 Week 1 Deliverables
- ✅ Responsive static frontend for desktop and mobile
- ✅ Home Page — Hero, Categories, Featured Products, Promo, Newsletter
- ✅ Product Listing Page — Filters sidebar, responsive grid, sort
- ✅ Product Details Page — Image gallery, variants, add-to-cart
- ✅ Cart Page — Item management, coupon code, order summary

## 🛠 Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 7, TailwindCSS 3, React Router v6 |
| Backend | Node.js, Express.js 4, CORS, dotenv |
| Styling | TailwindCSS v3 + custom design system |
| Icons | Heroicons v2 |

## 📂 Project Structure
```
ecomm/
├── frontend/     # React + Vite app
└── backend/      # Express.js API
```

## ⚡ Running Locally

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Backend
```bash
cd backend
npm install
node server.js
# → http://localhost:5000
```

## 🎨 Design
- Primary color: `#DB4444`
- Font: Inter (Google Fonts)
- Fully responsive using CSS Grid + Flexbox

## 📱 Pages
| Page | Route |
|------|-------|
| Home | `/` |
| Products | `/products` |
| Product Detail | `/products/:id` |
| Cart | `/cart` |

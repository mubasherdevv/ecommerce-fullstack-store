# Exclusive - E-Commerce Fullstack Platform

A comprehensive full-stack e-commerce web application built with the **MERN Stack** (MongoDB, Express.js, React + Vite, and Node.js). This platform provides a complete shopping experience with user authentication, product management, shopping cart functionality, order processing, and a robust admin dashboard.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Main Features](#main-features)
- [Backend Architecture](#backend-architecture)
  - [API Routes](#api-routes)
  - [Database Schema](#database-schema)
  - [Authentication](#authentication)
- [Frontend Architecture](#frontend-architecture)
  - [Pages](#pages)
  - [Components](#components)
  - [Context Providers](#context-providers)
- [Key Dependencies](#key-dependencies)
- [Environment Variables](#environment-variables)
- [Build and Run Instructions](#build-and-run-instructions)
- [Available Scripts](#available-scripts)
- [Default Users](#default-users)
- [Future Enhancements](#future-enhancements)

---

## Project Overview

**Exclusive** is a modern e-commerce platform featuring:

- **Dynamic Shopping Experience**: Browse products, add to cart, checkout
- **User Authentication**: JWT-based registration/login with role-based access
- **Admin Dashboard**: Analytics, order management, product CRUD, category management
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Real-time Analytics**: 7-day revenue trends using MongoDB aggregation pipelines

---

## Project Structure

```
ecomm/
├── backend/                    # Express.js API Server
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication & admin authorization
│   ├── models/
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js    # JWT token generation utility
│   ├── seeder.js              # Database seeding script
│   ├── server.js              # Express server entry point
│   ├── package.json
│   └── .env                   # Environment variables
│
├── frontend/                   # React + Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminAnalytics.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── RecentOrdersList.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminOrderListPage.jsx
│   │   │   ├── AdminProductListPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CategoryManagePage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── OrderHistoryPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── ProductEditPage.jsx
│   │   │   ├── ProductListingPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── package.json                # Root package.json (orchestrator)
├── package-lock.json
└── README.md
```

---

## Technology Stack

### Backend
| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Runtime | Node.js | Latest | JavaScript runtime |
| Framework | Express.js | ^4.21.2 | REST API framework |
| Database | MongoDB Atlas | - | NoSQL database |
| ODM | Mongoose | ^9.2.4 | MongoDB object modeling |
| Auth | JSON Web Token (JWT) | ^9.0.3 | Stateless authentication |
| Security | bcryptjs | ^3.0.3 | Password hashing |
| CORS | cors | ^2.8.5 | Cross-origin resource sharing |
| Config | dotenv | ^16.4.7 | Environment variable management |
| Dev | nodemon | ^3.1.9 | Development auto-reload |

### Frontend
| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | React | ^19.2.0 | UI library |
| Build Tool | Vite | ^7.3.1 | Fast build tool |
| Routing | React Router | ^7.13.1 | Client-side routing |
| Styling | Tailwind CSS | ^3.4.19 | Utility-first CSS |
| HTTP Client | Axios | ^1.13.6 | API requests |
| Charts | Recharts | ^3.8.0 | Data visualization |
| Icons | Heroicons | ^2.2.0 | SVG icon library |
| Animations | Framer Motion | ^12.35.1 | Animation library |
| CSS | PostCSS | ^8.5.8 | CSS processing |
| Linting | ESLint | ^9.39.1 | Code quality |

---

## Main Features

### Customer Features
1. **Product Browsing**
   - Home page with featured products and categories
   - Product catalog with filtering by category, price range, and rating
   - Sorting by price (asc/desc), rating, and featured items
   - Search functionality by product name
   - Detailed product pages with image gallery, reviews, and stock status

2. **Shopping Cart**
   - Add/remove products
   - Adjust quantities
   - Persistent cart storage (localStorage)
   - Discount coupon support (try "SAVE10" for 10% off)
   - Real-time price calculation with shipping

3. **Checkout & Orders**
   - Shipping address collection
   - Order placement
   - Order history viewing
   - Delivery status tracking

4. **User Account**
   - Registration with name, email, password
   - Login with email/password
   - Profile viewing
   - JWT token-based session management

### Admin Features
1. **Dashboard Analytics**
   - Total revenue and orders KPIs
   - 7-day revenue trend chart
   - Recent orders list

2. **Product Management**
   - Create new products
   - Edit product details (name, price, image, category, stock, description)
   - Delete products
   - View all products in a table

3. **Category Management**
   - Create categories with name, slug, and image
   - Edit existing categories
   - Delete categories (with product count protection)
   - View categories with associated product counts

4. **Order Management**
   - View all customer orders
   - View order details (items, shipping address, total)
   - Mark orders as delivered

---

## Backend Architecture

### API Routes

#### Products (`/api/products`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products (with keyword/category filtering) |
| GET | `/api/products/:id` | Public | Get single product by ID |
| POST | `/api/products` | Private/Admin | Create new product |
| PUT | `/api/products/:id` | Private/Admin | Update product |
| DELETE | `/api/products/:id` | Private/Admin | Delete product |

#### Users (`/api/users`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/users` | Public | Register new user |
| POST | `/api/users/login` | Public | Login user |
| GET | `/api/users/profile` | Private | Get user profile |

#### Orders (`/api/orders`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/orders` | Private/Admin | Get all orders |
| GET | `/api/orders/myorders` | Private | Get current user's orders |
| GET | `/api/orders/recent` | Private/Admin | Get 5 most recent orders |
| GET | `/api/orders/analytics` | Private/Admin | Get order analytics data |
| POST | `/api/orders` | Private | Create new order |
| PUT | `/api/orders/:id/deliver` | Private/Admin | Mark order as delivered |

#### Categories (`/api/categories`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/categories` | Public | Get all categories with product counts |
| POST | `/api/categories` | Private/Admin | Create new category |
| PUT | `/api/categories/:id` | Private/Admin | Update category |
| DELETE | `/api/categories/:id` | Private/Admin | Delete category |

### Database Schema

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

#### Product Model
```javascript
{
  user: ObjectId (ref: User),
  name: String (required),
  image: String (required),
  description: String (required),
  category: String (required),
  price: Number (required, default: 0),
  originalPrice: Number,
  countInStock: Number (default: 0),
  rating: Number (default: 0),
  numReviews: Number (default: 0),
  reviews: [{
    name: String,
    rating: Number,
    comment: String,
    user: ObjectId (ref: User),
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Order Model
```javascript
{
  user: ObjectId (ref: User),
  orderItems: [{
    name: String,
    qty: Number,
    image: String,
    price: Number,
    product: ObjectId (ref: Product)
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  totalPrice: Number,
  isDelivered: Boolean (default: false),
  deliveredAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Category Model
```javascript
{
  name: String (required, unique),
  slug: String (required, unique),
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Authentication

The application uses **JWT (JSON Web Token)** for authentication:

1. **Token Generation**: When a user logs in or registers, a JWT token is generated with a 30-day expiration containing the user's ID
2. **Token Storage**: Tokens are stored in localStorage on the frontend
3. **Authorization Header**: All protected API requests include `Authorization: Bearer <token>`
4. **Token Verification**: Middleware validates the token and attaches the user to the request object
5. **Admin Authorization**: Separate middleware checks `req.user.isAdmin` for admin routes

---

## Frontend Architecture

### Pages

| Page | Route | Access | Description |
|------|-------|--------|-------------|
| HomePage | `/` | Public | Landing page with hero, categories, featured products |
| ProductListingPage | `/products` | Public | Product catalog with filters and sorting |
| ProductDetailPage | `/products/:id` | Public | Individual product details |
| CartPage | `/cart` | Public | Shopping cart with checkout |
| LoginPage | `/login` | Public | User login |
| RegisterPage | `/register` | Public | User registration |
| ProfilePage | `/profile` | Private | User profile display |
| OrderHistoryPage | `/orders` | Private | User's order history |
| AdminDashboardPage | `/admin` | Admin | Analytics dashboard |
| AdminProductListPage | `/admin/products` | Admin | Product management |
| ProductEditPage | `/admin/product/:id/edit` | Admin | Product editing |
| CategoryManagePage | `/admin/categories` | Admin | Category management |
| AdminOrderListPage | `/admin/orders` | Admin | Order management |

### Components

| Component | Purpose |
|-----------|---------|
| Navbar | Main navigation with search, cart icon, user menu |
| Footer | Site footer with links and social icons |
| ProductCard | Reusable product display card with add-to-cart |
| PrivateRoute | Route wrapper for authenticated users |
| AdminRoute | Route wrapper for admin users |
| AdminAnalytics | Dashboard charts and KPIs |
| RecentOrdersList | Recent orders table for admin |

### Context Providers

| Context | Purpose |
|---------|---------|
| AuthContext | User authentication state, login/logout/register |
| CartContext | Shopping cart state, add/remove/update items |
| ProductContext | Product fetching and caching |

---

## Key Dependencies

### Backend Dependencies
```json
{
  "express": "^4.21.2",
  "mongoose": "^9.2.4",
  "jsonwebtoken": "^9.0.3",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7"
}
```

### Frontend Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.1",
  "axios": "^1.13.6",
  "tailwindcss": "^3.4.19",
  "@heroicons/react": "^2.2.0",
  "recharts": "^3.8.0",
  "framer-motion": "^12.35.1"
}
```

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecomm?appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_here
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 5000 |
| `NODE_ENV` | Environment mode | development |
| `MONGO_URI` | MongoDB Atlas connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |

---

## Build and Run Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Option 1: Using Root Scripts (Recommended)

```bash
# Install all dependencies (backend + frontend)
npm install

# Start both backend and frontend in development
npm run dev  # Frontend: http://localhost:5173
npm start     # Backend only: http://localhost:5000

# Build for production
npm run build

# Import seed data
npm run data:import
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install

# Create .env file with your MongoDB URI and JWT secret

# Start development server (with auto-reload)
npm run dev

# Or start production server
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Option 3: Using Docker (if applicable)
```bash
# Build and run containers
docker-compose up -d
```

---

## Available Scripts

### Root Scripts (`package.json`)
| Script | Command | Description |
|--------|---------|-------------|
| `postinstall` | `npm install --prefix backend && npm install --prefix frontend` | Auto-install all dependencies |
| `build` | `npm run build --prefix frontend` | Build frontend for production |
| `start` | `npm start --prefix backend` | Start backend server |

### Backend Scripts (`backend/package.json`)
| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node server.js` | Start production server |
| `dev` | `nodemon server.js` | Start development server with auto-reload |
| `data:import` | `node seeder.js` | Import sample data (products, admin user) |
| `data:destroy` | `node seeder.js -d` | Delete all data from database |

### Frontend Scripts (`frontend/package.json`)
| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Start Vite dev server |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint .` | Run ESLint |

---

## Default Users

After running `npm run data:import` (or `npm run data:destroy`), the following users are created:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| User | john@example.com | password123 |

**Note**: The admin user has full access to the admin dashboard and can manage products, categories, and orders.

---

## Color Scheme

The application uses a consistent color palette defined in Tailwind configuration:

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary | `#DB4444` | Buttons, accents, CTAs |
| Primary Dark | `#A33232` | Hover states |
| Primary Light | `#FFDADA` | Light backgrounds |
| Secondary | `#00FF66` | Success states, badges |
| Dark | `#1D2128` | Primary text, footer |
| Gray Light | `#F5F5F5` | Backgrounds |
| Gray Medium | `#7D8184` | Secondary text |
| Gray Dark | `#3D4148` | Darker accents |

---

## Future Enhancements

The following features could be implemented to extend the platform:

1. **Payment Integration**
   - Stripe or PayPal payment gateway
   - Payment confirmation and receipt generation

2. **Product Reviews & Ratings**
   - Allow users to submit reviews
   - Display average ratings on product cards

3. **Wishlist/Favorites**
   - Save products for later
   - Cross-device sync

4. **Email Notifications**
   - Order confirmation emails
   - Password reset functionality
   - Newsletter subscription

5. **Advanced Search**
   - Full-text search with Elasticsearch
   - Autocomplete suggestions
   - Filter combinations

6. **Image Upload**
   - Cloud storage (AWS S3, Cloudinary)
   - Image resizing and optimization

7. **Social Authentication**
   - Google OAuth
   - Facebook Login

8. **Inventory Management**
   - Low stock alerts
   - Automatic stock updates on order

9. **Analytics Dashboard**
   - Sales reports
   - User activity tracking
   - Product performance metrics

10. **Multi-vendor Support**
    - Seller dashboard
    - Commission tracking

---

## License

This project is licensed under the MIT License.

---

## Author

Built with the MERN Stack as a comprehensive e-commerce demonstration project.

---

## Acknowledgments

- [MongoDB Atlas](https://www.mongodb.com/atlas) for database hosting
- [Unsplash](https://unsplash.com) for product images
- [Heroicons](https://heroicons.com) for beautiful icons
- [Vite](https://vitejs.dev) for fast development experience

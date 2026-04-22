# Gourmet Palace - Restaurant Web Application Specification

## 1. Project Overview
- **Project Name**: Gourmet Palace
- **Type**: Full-stack Restaurant Web Application
- **Core Functionality**: Premium restaurant with online ordering, authentication, cart management, and admin dashboard
- **Target Users**: Restaurant customers and administrators

## 2. Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **API Client**: Axios

## 3. UI/UX Specification

### Color Palette (Dark + Gold Premium Theme)
- **Primary Background**: #0D0D0D (Rich Black)
- **Secondary Background**: #1A1A1A (Dark Gray)
- **Card Background**: #242424 (Charcoal)
- **Primary Gold**: #D4AF37 (Metallic Gold)
- **Primary Gold Hover**: #F5C842 (Bright Gold)
- **Accent Gold Light**: #F4E4BC (Champagne)
- **Text Primary**: #FFFFFF (White)
- **Text Secondary**: #B3B3B3 (Light Gray)
- **Text Muted**: #737373 (Gray)
- **Success**: #22C55E (Green)
- **Error**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)
- **Border**: #333333 (Dark Border)

### Typography
- **Font Family**: 
  - Headings: 'Playfair Display', serif
  - Body: 'Inter', sans-serif
- **Font Sizes**:
  - Hero Title: 64px / 4rem (desktop), 36px / 2.25rem (mobile)
  - H1: 48px / 3rem
  - H2: 36px / 2.25rem
  - H3: 24px / 1.5rem
  - Body Large: 18px / 1.125rem
  - Body: 16px / 1rem
  - Small: 14px / 0.875rem
  - XSmall: 12px / 0.75rem

### Spacing System (8px base)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
- 4xl: 96px

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Animations
- Page transitions: Fade + slide (300ms)
- Card hover: Scale 1.02, box-shadow increase
- Button hover: Background shift, scale 1.05
- Loading: Skeleton pulse animation
- Toast: Slide in from right

## 4. Database Schema

### User Collection
```javascript
{
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Food Collection
```javascript
{
  name: String (required, 2-100 chars),
  price: Number (required, min 0),
  category: String (enum: ['veg', 'non-veg', 'drinks', 'desserts']),
  description: String (max 500 chars),
  image: String (URL),
  rating: Number (0-5, default 0),
  reviewCount: Number (default 0),
  isAvailable: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    foodId: ObjectId (ref: Food),
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: Number,
  status: String (enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'], default: 'pending'),
  paymentMethod: String (enum: ['cash', 'online']),
  address: {
    street: String,
    city: String,
    zipCode: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 5. API Endpoints

### Auth Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user (protected)

### Food Routes
- GET /api/foods - Get all foods (with filters)
- GET /api/foods/:id - Get single food
- POST /api/foods - Create food (admin only)
- PUT /api/foods/:id - Update food (admin only)
- DELETE /api/foods/:id - Delete food (admin only)

### Order Routes
- GET /api/orders - Get all orders (admin)
- GET /api/orders/my-orders - Get user's orders
- POST /api/orders - Create order
- PUT /api/orders/:id/status - Update order status (admin)

## 6. Pages & Components

### Pages
1. **Home Page** - Hero, featured dishes, CTAs
2. **Menu Page** - Category filters, search, food grid
3. **Product Details Page** - Full info, quantity, add to cart
4. **Cart Page** - Cart items, quantity, total
5. **Checkout Page** - Address form, payment, summary
6. **Login/Register Page** - Authentication forms
7. **Admin Dashboard** - CRUD operations, orders, users

### Reusable Components
- Button (primary, secondary, outline variants)
- Input (text, email, password)
- Card (food card, order card)
- Modal
- Toast (success, error, warning, info)
- Loading Skeleton
- Navbar
- Footer
- FoodCard
- CartItem
- ProtectedRoute
- AdminRoute

## 7. Functionality

### Authentication
- JWT-based with httpOnly storage simulation (localStorage)
- Password hashing with bcrypt (10 rounds)
- Token refresh on login
- Protected route middleware

### Cart Management
- Persistent cart (localStorage)
- Add/remove items
- Update quantities
- Calculate totals

### Admin Features
- Full CRUD for food items
- View all orders
- Update order status
- View all users

## 8. Security
- bcrypt password hashing
- JWT authentication
- Protected routes (auth middleware)
- Admin-only routes
- Input validation
- Error handling middleware

## 9. Project Structure
```
/gourmet-palace
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── .env
├── package.json
└── README.md
```

## 10. Acceptance Criteria

### Must Pass
- [ ] App loads without errors
- [ ] Dark + gold theme applied consistently
- [ ] Responsive on mobile, tablet, desktop
- [ ] User can register and login
- [ ] User can browse menu
- [ ] User can add items to cart
- [ ] User can complete checkout
- [ ] Cart persists on refresh
- [ ] Admin can manage foods
- [ ] Admin can view and update orders

### Visual Checkpoints
- [ ] Gold accents on buttons and highlights
- [ ] Smooth animations on page transitions
- [ ] Loading skeletons during data fetch
- [ ] Toast notifications on actions
- [ ] Clean typography (Playfair Display headings)
- [ ] Dark background throughout the app
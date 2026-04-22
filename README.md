# Gourmet Palace - Restaurant Web Application

A premium modern restaurant web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🍽️ **Modern UI/UX**: Dark + gold premium theme
- 📱 **Fully Responsive**: Mobile-first design
- 🔐 **JWT Authentication**: Secure login/register
- 🛒 **Shopping Cart**: Persistent cart with localStorage
- 📦 **Order Management**: Full checkout flow
- 👨‍💼 **Admin Dashboard**: Manage foods and orders

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API

## Project Structure

```
gourmet-palace/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── context/    # Context providers
│   │   ├── pages/     # Page components
│   │   ├── services/  # API services
│   │   └── App.jsx    # Main app
│   └── package.json
├── server/               # Express backend
│   ├── config/          # Database config
│   ├── controllers/     # Route controllers
│   ├── middleware/     # Auth & error middleware
│   ├── models/         # Mongoose models
│   └── routes/         # API routes
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies:**
```bash
# Install all dependencies
npm run install-all
```

2. **Configure environment variables:**
```bash
# Server (.env)
cp server/.env.example server/.env
# Edit with your MongoDB URI and JWT secret
```

### Running the Application

**Development mode (both server and client):**
```bash
npm run dev
```

**Individual modes:**
```bash
# Terminal 1 - Backend (port 5000)
cd server && npm run dev

# Terminal 2 - Frontend (port 3000)
cd client && npm run dev
```

### Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Default Admin Account

After server startup, create an admin user via MongoDB:
1. Register a new user at http://localhost:3000/login
2. In MongoDB, update the user's role:
```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Foods
- `GET /api/foods` - Get all foods
- `GET /api/foods/:id` - Get food by ID
- `POST /api/foods` - Create food (admin)
- `PUT /api/foods/:id` - Update food (admin)
- `DELETE /api/foods/:id` - Delete food (admin)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/my-orders` - Get user's orders (protected)
- `GET /api/orders/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update status (admin)

## License

MIT License
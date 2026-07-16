# 👑 Gourmet Palace - Premium Restaurant Web Application

<div align="center">

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-MediumPurple.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![React 18](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-emerald.svg?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**A premium, modern restaurant web application built with the MERN stack featuring a luxury dark and gold aesthetic.**


</div>

---

## 🌟 Key Features

*   🎨 **Premium UI/UX:** High-end dark and gold luxury theme designed for premium fine-dining aesthetics.
*   📱 **Fully Responsive:** Mobile-first layout seamlessly adapts to smartphones, tablets, and desktops.
*   🔐 **JWT Authentication:** Highly secure user registration, login, and robust route protection.
*   🛒 **Smart Shopping Cart:** Persistent cart state using `localStorage` (keeps items saved even after page refreshes).
*   📦 **Order Management:** Complete checkout flow and streamlined order tracking for customers.
*   👨‍💼 **Admin Dashboard:** Full-featured back-office system to seamlessly manage food items and customer orders.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **State Management** | React Context API |

---



---

## 📁 Project Structure

```text
gourmet-palace/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Global state management
│   │   ├── pages/       # Page components (Home, Cart, Admin)
│   │   ├── services/    # Axios / API services
│   │   └── App.jsx      # Main application entry
│   └── package.json
├── server/              # Express backend
│   ├── config/          # Database connection setup
│   ├── controllers/     # Business logic for API endpoints
│   ├── middleware/      # Auth verification & error handlers
│   ├── models/          # MongoDB Mongoose schemas
│   └── routes/          # Express API routes
└── README.md
